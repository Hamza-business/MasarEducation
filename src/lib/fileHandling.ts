import { PassportFile, ReceiptFile } from '@/types/all';
import imageCompression from 'browser-image-compression';


export async function compressFile(file: PassportFile | ReceiptFile): Promise<PassportFile | ReceiptFile> {
    const isImage = file.mimetype === 'image/jpeg' || file.mimetype === 'image/png';

    if (!isImage) {
        return file;
    }

    const blob = base64ToBlob(file.data, file.mimetype);
    const originalFile = new File([blob], file.name, { type: file.mimetype });

    const compressedFile = await imageCompression(originalFile, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
    });

    const compressedBase64 = await fileToBase64(compressedFile);

    return {
        name: compressedFile.name,
        mimetype: compressedFile.type,
        data: compressedBase64,
    };
}

function base64ToBlob(base64: string, type: string): Blob {
    const binary = atob(base64);
    const array = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new Blob([array], { type });
}

function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve(base64);
        };
        reader.onerror = reject;
    });
}


export function getFileSize(file: PassportFile | ReceiptFile){
    const base64Length = file.data.length;
    const padding = (file.data.endsWith('==') ? 2 : file.data.endsWith('=') ? 1 : 0);

    // Formula: (base64Length * 3/4) - padding
    const bytes = (base64Length * 3) / 4 - padding;

    console.log('Bytes:', Math.round(bytes));
    console.log('KB:', +(bytes / 1024).toFixed(2));
    console.log('MB:', +(bytes / (1024 * 1024)).toFixed(2));
}