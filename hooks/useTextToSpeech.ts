import { useState, useEffect, useCallback } from 'react';

const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const synth = window.speechSynthesis;

  const updateVoices = useCallback(() => {
    setVoices(synth.getVoices());
  }, [synth]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    
    updateVoices();
    synth.onvoiceschanged = updateVoices;

    return () => {
      synth.onvoiceschanged = null;
      synth.cancel(); // Cancel any speech on unmount
    };
  }, [synth, updateVoices]);

  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (synth.speaking) {
      synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    // Find a good quality voice
    const preferredVoice = voices.find(voice => voice.name.includes('Google US English')) || voices.find(voice => voice.lang === 'en-US');
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    utterance.pitch = 1;
    utterance.rate = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synth.speak(utterance);
  }, [synth, voices]);

  const stop = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    synth.cancel();
    setIsSpeaking(false);
  }, [synth]);

  return {
    speak,
    stop,
    isSpeaking,
    hasTTSSupport: typeof window !== 'undefined' && !!window.speechSynthesis
  };
};

export default useTextToSpeech;
