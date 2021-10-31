import { useState, useEffect } from "react";

export function useImage() {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(function () {
        //setImage(image);
        console.log(image)
        if (image) {
            setImagePreview(URL.createObjectURL(image.files[0]));
        }
    }, [image])

    return { image, setImage, imagePreview};
}