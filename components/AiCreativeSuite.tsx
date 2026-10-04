import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import GlassmorphicCard from './GlassmorphicCard';
import { toBase64 } from '../utils/file';
import Loader from './Loader';

type AiTool = 'generator' | 'editor' | 'remover';

const AiCreativeSuite: React.FC = () => {
  // API Key State
  const [userApiKey, setUserApiKey] = useState<string>('');
  const [apiKeyInput, setApiKeyInput] = useState<string>('');

  useEffect(() => {
    const storedKey = sessionStorage.getItem('user-gemini-api-key');
    if (storedKey) {
      setUserApiKey(storedKey);
    }
  }, []);

  const handleSaveKey = () => {
    if (apiKeyInput.trim()) {
      const key = apiKeyInput.trim();
      setUserApiKey(key);
      sessionStorage.setItem('user-gemini-api-key', key);
    }
  };

  const handleResetKey = () => {
    setUserApiKey('');
    setApiKeyInput('');
    sessionStorage.removeItem('user-gemini-api-key');
  };

  // Common state
  const [activeTool, setActiveTool] = useState<AiTool>('generator');

  // Generator state
  const [generatorPrompt, setGeneratorPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatorError, setGeneratorError] = useState<string | null>(null);

  // Editor state
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [editorPrompt, setEditorPrompt] = useState('');
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editorError, setEditorError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Remover state
  const [removerImage, setRemoverImage] = useState<string | null>(null);
  const [removerImageFile, setRemoverImageFile] = useState<File | null>(null);
  const [removedBgImage, setRemovedBgImage] = useState<string | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const [removerError, setRemoverError] = useState<string | null>(null);
  const removerFileInputRef = useRef<HTMLInputElement>(null);

  const getAiClient = () => {
    if (!userApiKey) {
      throw new Error("API Key is not set.");
    }
    return new GoogleGenAI({ apiKey: userApiKey });
  }

  // Generator Logic
  const handleImageGenerate = async () => {
    if (!generatorPrompt) {
      setGeneratorError('Please enter a prompt.');
      return;
    }
    setIsGenerating(true);
    setGeneratorError(null);
    setGeneratedImage(null);

    try {
      const ai = getAiClient();
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: generatorPrompt }],
        },
        config: {
          responseModalities: [Modality.IMAGE],
        },
      });
      
      const firstPart = response.candidates?.[0]?.content?.parts?.[0];
      if (firstPart && firstPart.inlineData) {
        const newImageData = firstPart.inlineData.data;
        setGeneratedImage(`data:image/png;base64,${newImageData}`);
      } else {
        throw new Error('No image was generated. The prompt may have been blocked.');
      }
    } catch (e: any) {
      if (e.message?.includes('API key not valid')) {
        setGeneratorError('The API key you provided is invalid. Please check it and try again.');
        handleResetKey();
      } else {
        setGeneratorError(e.message || 'An unexpected error occurred.');
      }
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGeneratorDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'generated-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Editor Logic
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOriginalImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result as string);
        setEditedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageEdit = async () => {
    if (!originalImageFile || !editorPrompt) {
      setEditorError('Please upload an image and enter a prompt.');
      return;
    }
    setIsEditing(true);
    setEditorError(null);
    setEditedImage(null);

    try {
      const ai = getAiClient();
      const base64Data = await toBase64(originalImageFile);
      const [meta, data] = base64Data.split(',');
      const mimeType = meta.match(/:(.*?);/)?.[1] ?? 'image/jpeg';
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data, mimeType } },
            { text: editorPrompt },
          ],
        },
        config: {
          responseModalities: [Modality.IMAGE],
        },
      });

      const firstPart = response.candidates?.[0]?.content?.parts?.[0];
      if (firstPart && firstPart.inlineData) {
        const newImageData = firstPart.inlineData.data;
        setEditedImage(`data:${mimeType};base64,${newImageData}`);
      } else {
        throw new Error('No image was generated. The prompt may have been blocked.');
      }
    } catch (e: any) {
      if (e.message?.includes('API key not valid')) {
        setEditorError('The API key you provided is invalid. Please check it and try again.');
        handleResetKey();
      } else {
        setEditorError(e.message || 'An unexpected error occurred.');
      }
      console.error(e);
    } finally {
      setIsEditing(false);
    }
  };

  const handleEditorDownload = () => {
    if (editedImage) {
      const link = document.createElement('a');
      link.href = editedImage;
      link.download = 'edited-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // BG Remover Logic
  const handleRemoverImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        setRemoverImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setRemoverImage(reader.result as string);
            setRemovedBgImage(null);
        };
        reader.readAsDataURL(file);
    }
  };

  const handleBgRemove = async () => {
    if (!removerImageFile) {
        setRemoverError('Please upload an image.');
        return;
    }
    setIsRemoving(true);
    setRemoverError(null);
    setRemovedBgImage(null);

    try {
        const ai = getAiClient();
        const base64Data = await toBase64(removerImageFile);
        const [meta, data] = base64Data.split(',');
        const mimeType = meta.match(/:(.*?);/)?.[1] ?? 'image/jpeg';
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    { inlineData: { data, mimeType } },
                    { text: "Segment the primary subject and remove the background, making it transparent. The final output must be a PNG with a proper alpha channel." },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        const firstPart = response.candidates?.[0]?.content?.parts?.[0];
        if (firstPart && firstPart.inlineData) {
            const newImageData = firstPart.inlineData.data;
            setRemovedBgImage(`data:image/png;base64,${newImageData}`);
        } else {
            throw new Error('Could not remove background. The prompt may have been blocked.');
        }
    } catch (e: any) {
        if (e.message?.includes('API key not valid')) {
            setRemoverError('The API key you provided is invalid. Please check it and try again.');
            handleResetKey();
        } else {
            setRemoverError(e.message || 'An unexpected error occurred.');
        }
        console.error(e);
    } finally {
        setIsRemoving(false);
    }
  };

  const handleRemoverDownload = () => {
    if (removedBgImage) {
        const link = document.createElement('a');
        link.href = removedBgImage;
        link.download = 'background-removed.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  };

  const renderApiKeyForm = () => (
    <div className="space-y-4 text-center">
      <h3 className="text-xl font-semibold">Enter your API Key</h3>
      <p className="text-gray-600 dark:text-white/70">
        To use this public creative suite, please provide your own Google AI Studio API key. 
        Your key is only stored in your browser for this session.
      </p>
       <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">
        Get your API Key from Google AI Studio &rarr;
      </a>
      <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
        <input
          type="password"
          value={apiKeyInput}
          onChange={(e) => setApiKeyInput(e.target.value)}
          placeholder="Enter your Gemini API Key"
          className="flex-grow bg-gray-200/50 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none transition"
        />
        <button
          onClick={handleSaveKey}
          disabled={!apiKeyInput.trim()}
          className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
        >
          Save Key
        </button>
      </div>
    </div>
  );

  const renderCreativeSuite = () => (
    <>
      <div className="absolute top-4 right-6">
        <button onClick={handleResetKey} className="text-sm text-gray-500 hover:text-orange-500 transition-colors">
          Reset API Key
        </button>
      </div>
      <div className="mb-6 border-b border-black/10 dark:border-white/10">
        <nav className="flex space-x-4 -mb-px">
          <button onClick={() => setActiveTool('generator')} className={`py-4 px-1 inline-flex items-center gap-2 text-sm font-medium whitespace-nowrap ${activeTool === 'generator' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-orange-500'}`}>
            Image Generator
          </button>
          <button onClick={() => setActiveTool('editor')} className={`py-4 px-1 inline-flex items-center gap-2 text-sm font-medium whitespace-nowrap ${activeTool === 'editor' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-orange-500'}`}>
            Image Editor
          </button>
          <button onClick={() => setActiveTool('remover')} className={`py-4 px-1 inline-flex items-center gap-2 text-sm font-medium whitespace-nowrap ${activeTool === 'remover' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-orange-500'}`}>
            BG Remover
          </button>
        </nav>
      </div>

      {activeTool === 'generator' && (
        <div className="space-y-6">
          <div>
            <label htmlFor="generator-prompt" className="block text-lg font-medium mb-2">Prompt</label>
            <input id="generator-prompt" type="text" value={generatorPrompt} onChange={(e) => setGeneratorPrompt(e.target.value)} placeholder="e.g., A futuristic cityscape, 16:9 aspect ratio" className="w-full bg-gray-200/50 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none transition" />
          </div>
          <div className="text-center">
            <button onClick={handleImageGenerate} disabled={isGenerating || !generatorPrompt} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center mx-auto">{isGenerating ? <Loader /> : 'Generate'}</button>
          </div>
        </div>
      )}

      {activeTool === 'editor' && (
        <div className="space-y-6">
          <div className="text-center">
            <input type="file" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} className="hidden" />
            <button onClick={() => fileInputRef.current?.click()} className="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">{originalImage ? 'Change Image' : 'Upload Image'}</button>
          </div>
          {originalImage && (
            <>
              <div>
                <label htmlFor="editor-prompt" className="block text-lg font-medium mb-2">Editing Prompt</label>
                <input id="editor-prompt" type="text" value={editorPrompt} onChange={(e) => setEditorPrompt(e.target.value)} placeholder="e.g., Add a retro filter, make the sky purple" className="w-full bg-gray-200/50 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none transition" />
              </div>
              <div className="text-center">
                <button onClick={handleImageEdit} disabled={isEditing || !editorPrompt} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center mx-auto">{isEditing ? <Loader /> : 'Generate Edit'}</button>
              </div>
            </>
          )}
        </div>
      )}

      {activeTool === 'remover' && (
         <div className="space-y-6">
           <div className="text-center">
             <input type="file" accept="image/*" onChange={handleRemoverImageUpload} ref={removerFileInputRef} className="hidden" />
             <button onClick={() => removerFileInputRef.current?.click()} className="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">{removerImage ? 'Change Image' : 'Upload Image'}</button>
           </div>
           {removerImage && (
             <div className="text-center">
               <button onClick={handleBgRemove} disabled={isRemoving} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center mx-auto">{isRemoving ? <Loader /> : 'Remove Background'}</button>
             </div>
           )}
         </div>
      )}
    </>
  );

  return (
    <main className="container mx-auto px-6 md:px-12 lg:px-24 py-12">
      <style>{`
        .checkerboard {
          background-color: #ffffff;
          background-image:
            linear-gradient(45deg, #ccc 25%, transparent 25%),
            linear-gradient(-45deg, #ccc 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #ccc 75%),
            linear-gradient(-45deg, transparent 75%, #ccc 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        }
        .dark .checkerboard {
          background-color: #333333;
          background-image:
            linear-gradient(45deg, #555 25%, transparent 25%),
            linear-gradient(-45deg, #555 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #555 75%),
            linear-gradient(-45deg, transparent 75%, #555 75%);
        }
      `}</style>
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">AI Creative Suite</h1>
        <p className="text-lg text-gray-600 dark:text-white/70 max-w-2xl mx-auto">
          Create and edit stunning images with the power of Gemini. This is a public demo, so you'll need your own API key to proceed.
        </p>
      </div>

      <GlassmorphicCard className="max-w-4xl mx-auto animate-fade-in-up relative" style={{ animationDelay: '200ms' }}>
         {userApiKey ? renderCreativeSuite() : renderApiKeyForm()}
      </GlassmorphicCard>
      
      {userApiKey && (
        <>
          {activeTool === 'generator' && (
            <>
              {generatorError && <div className="text-center my-4 text-red-500 dark:text-red-400"><p><strong>Error:</strong> {generatorError}</p></div>}
              {(isGenerating || generatedImage) && (
                <div className="mt-12 flex justify-center"><div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">Generated Image</h2>
                  <div className="w-full max-w-lg bg-gray-200/50 dark:bg-black/20 rounded-lg shadow-md flex items-center justify-center min-h-[200px] p-2">
                    {isGenerating && <Loader large={true} />}
                    {generatedImage && <img src={generatedImage} alt="Generated by AI" className="rounded-lg mx-auto max-h-[512px] w-auto h-auto animate-fade-in-up" />}
                  </div>
                  {generatedImage && !isGenerating && (
                    <div className="mt-6"><button onClick={handleGeneratorDownload} className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>Download Image</button></div>
                  )}
                </div></div>
              )}
            </>
          )}

          {activeTool === 'editor' && (
            <>
              {editorError && <div className="text-center my-4 text-red-500 dark:text-red-400"><p><strong>Error:</strong> {editorError}</p></div>}
              {(isEditing || editedImage || originalImage) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Original</h2>
                    {originalImage && <img src={originalImage} alt="Original" className="rounded-lg shadow-md mx-auto max-h-96" />}
                  </div>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Edited</h2>
                    <div className="w-full aspect-auto bg-gray-200/50 dark:bg-black/20 rounded-lg shadow-md flex items-center justify-center min-h-[200px] md:min-h-full">
                      {isEditing && <Loader large={true} />}
                      {editedImage && <img src={editedImage} alt="Generated by AI" className="rounded-lg mx-auto max-h-96 animate-fade-in-up" />}
                    </div>
                    {editedImage && !isEditing && (
                      <div className="mt-6"><button onClick={handleEditorDownload} className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>Download Image</button></div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {activeTool === 'remover' && (
            <>
              {removerError && <div className="text-center my-4 text-red-500 dark:text-red-400"><p><strong>Error:</strong> {removerError}</p></div>}
              {(isRemoving || removedBgImage || removerImage) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Original</h2>
                    {removerImage && <img src={removerImage} alt="Original for BG Removal" className="rounded-lg shadow-md mx-auto max-h-96" />}
                  </div>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Result</h2>
                    <div className={`w-full aspect-auto bg-gray-200/50 dark:bg-black/20 rounded-lg shadow-md flex items-center justify-center min-h-[200px] md:min-h-full ${removedBgImage ? 'checkerboard' : ''}`}>
                      {isRemoving && <Loader large={true} />}
                      {removedBgImage && <img src={removedBgImage} alt="Background Removed" className="rounded-lg mx-auto max-h-96 animate-fade-in-up" />}
                    </div>
                    {removedBgImage && !isRemoving && (
                      <div className="mt-6">
                        <button onClick={handleRemoverDownload} className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                          Download Image
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </main>
  );
};

export default AiCreativeSuite;