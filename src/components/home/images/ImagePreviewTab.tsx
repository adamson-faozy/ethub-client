import React, { useState } from 'react'

type Props = {}

const ImagePreviewTab = (props: Props) => {
    const [selectedImageList, setSelectedImageList] = useState<string[]>([]);

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        // console.log(e.target.files[])
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map((file: Blob) => URL.createObjectURL(file));

            // console.log("filesArray: ", filesArray);

            setSelectedImageList((prevImages) => prevImages.concat(filesArray));
            Array.from(e.target.files).map(
                (file) => {
                    ;
                    URL.revokeObjectURL(file as unknown as string)
                }
                // avoid memory leak
            );
        }
    };

    const renderPhotos = (source: string[]) => {
        console.log('source: ', source);
        return source.map((photo) => {
            return <img src={photo} alt="" key={photo} />;
        });
    };

    return (
        <div>
            <div>
                <input type="file" id="file" multiple onChange={e => handleImageChange(e)} />
                <div className="label-holder">
                    <label htmlFor="file" className="label">
                        <i className="material-icons">add_a_photo</i>
                    </label>
                </div>
                <div className="result">{renderPhotos(selectedImageList)}</div>
            </div>
        </div>
    );
}