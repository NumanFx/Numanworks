import React, { useState, useRef } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import GlassmorphicCard from './GlassmorphicCard';
import { toBase64 } from '../utils/file';
import Loader from './Loader';

const AiImageEditor: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOriginalImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result as string);
        setGeneratedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateClick = () => {
    if (!originalImageFile || !prompt) {
      setError('Please upload an image and enter a prompt.');
      return;
    }
    setError('Only admins can access this feature.');
    setGeneratedImage(null);
    setIsLoading(false);
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'edited-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <main className="container mx-auto px-6 md:px-12 lg:px-24 py-12">
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">AI Image Editor</h1>
        <p className="text-lg text-gray-600 dark:text-white/70 max-w-2xl mx-auto">
          Upload an image and use a text prompt to edit it with the power of Gemini.
        </p>
      </div>

      <GlassmorphicCard className="max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <div className="space-y-6">
          <div className="text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
            >
              {originalImage ? 'Change Image' : 'Upload Image'}
            </button>
          </div>

          {originalImage && (
            <>
              <div>
                <label htmlFor="prompt" className="block text-lg font-medium mb-2">
                  Editing Prompt
                </label>
                <input
                  id="prompt"
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Add a retro filter, make the sky purple"
                  className="w-full bg-gray-200/50 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none transition"
                />
              </div>

              <div className="text-center">
                <button
                  onClick={handleGenerateClick}
                  disabled={isLoading || !prompt}
                  className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center mx-auto"
                >
                  {isLoading ? <Loader /> : 'Generate'}
                </button>
              </div>
            </>
          )}
        </div>
      </GlassmorphicCard>

      {error && (
        <div className="text-center my-4 text-red-500 dark:text-red-400 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}

      {(isLoading || generatedImage || originalImage) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Original</h2>
            {originalImage && <img src={originalImage} alt="Original" className="rounded-lg shadow-md mx-auto max-h-96" />}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Generated</h2>
            <div className="w-full aspect-auto bg-gray-200/50 dark:bg-black/20 rounded-lg shadow-md flex items-center justify-center min-h-[200px] md:min-h-full">
              {isLoading && <Loader large={true} />}
              {generatedImage && <img src={generatedImage} alt="Generated by AI" className="rounded-lg mx-auto max-h-96 animate-fade-in-up" />}
            </div>
             {generatedImage && !isLoading && (
              <div className="mt-6">
                <button
                  onClick={handleDownload}
                  className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Image
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default AiImageEditor;