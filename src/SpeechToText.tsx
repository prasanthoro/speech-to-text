"use client"
import React, { useState, useEffect } from 'react';

const SpeechToText = () => {
    const [transcript, setTranscript] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [recognition, setRecognition] = useState<any>(null);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new (window as any).webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;

            recognition.onstart = () => {
                console.log('Voice recognition started. Speak now...');
                setIsRecording(true);
            };

            recognition.onresult = (event: any) => {
                const interimTranscript = Array.from(event.results)
                    .map((result: any) => result[0].transcript)
                    .join('');
                setTranscript(interimTranscript);
            };

            recognition.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                stopRecognition();
            };

            recognition.onend = () => {
                console.log('Voice recognition ended.');
                setIsRecording(false);
            };

            setRecognition(recognition);
        }
    }, []);

    const startRecognition = () => {
        if (recognition) {
            setTranscript('');
            recognition.start();
        }
    };

    const stopRecognition = () => {
        if (recognition) {
            recognition.stop();
        }
    };

    const handleStartRecording = () => {
        if (!isRecording) {
            startRecognition();
        }
    };

    const handleStopRecording = () => {
        if (isRecording) {
            stopRecognition();
        }
    };

    return (
        <div style={{ marginLeft: "40%", marginTop: "50px" }}>
            <button onClick={handleStartRecording} disabled={isRecording}>
                Start Recording
            </button>

            <button onClick={handleStopRecording} disabled={!isRecording}>
                Stop Recording
            </button>
            {transcript && (
                <div>
                    <h3>Transcript:</h3>
                    <p>{transcript}</p>
                </div>
            )}
        </div>
    );
};

export default SpeechToText;