import React, { ChangeEvent, useEffect, useState } from "react";

interface ImageUploaderProps {
  setBase64Image: (input: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ setBase64Image }) => {
  const [base64Image, setbase64Image] = useState<string>('');
  const [base64Textarea, setBase64Textarea] = useState<string>('');

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type === 'image/png') {
      const reader = new FileReader();

      reader.onload = (loadEvent) => {
        const result = loadEvent.target?.result as string;
        setbase64Image(result);
        setBase64Textarea(result);
        setBase64Image(result); // Notify the parent component with the base64 text
      };

      reader.readAsDataURL(file);
    } else {
      // Handle invalid file type (not PNG)
      alert('Please select a valid PNG file.');
    }
  };

  return (
    <>
      <div className="">
        <input className="form-control m-3" type="file" id="fileInput" accept=".png" onChange={handleFileSelect} />
       {base64Image && <img id="base64Image" alt="Base64 Image" style={{ maxWidth: '300px' }} src={base64Image} />
}
      </div>
    </>
  );
};
