import { forwardRef } from "react";

type imageUploaderProps = {
  className?: string;
  onChange?: any;
}

const ImageUploader = forwardRef<HTMLInputElement, imageUploaderProps>(({ className, onChange }, ref) => {
  return (
      <input
        className={className}
        type="file"
        accept="image/*"
        onChange={onChange}
        ref={ref}
      />
  )
});

export default ImageUploader;