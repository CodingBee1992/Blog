// const [progress, setProgress] = useState(0);

// const onSubmit: SubmitHandler<postSchemaTypes> = async (data) => {
//   try {
//     const filesToUpload: File[] = [];

//     // Zliczamy wszystkie uploadowane pliki
//     if (data.mainImage.src instanceof File) {
//       filesToUpload.push(data.mainImage.src);
//     }

//     data.articleContent.forEach((item) => {
//       if (item.type === "image" && item.value.src instanceof File) {
//         filesToUpload.push(item.value.src);
//       }
//     });

//     let uploaded = 0;
//     const total = filesToUpload.length;

//     const updateGlobalProgress = (localProgress: number) => {
//       // global progress = średnia ważona
//       const progressPerFile = 100 / total;
//       const globalProgress = uploaded * progressPerFile + (localProgress / 100) * progressPerFile;
//       setProgress(globalProgress);
//     };

//     // --- UPLOAD MAIN IMAGE ---
//     let mainImage = data.mainImage;

//     if (mainImage.src instanceof File) {
//       const url = await uploadToCloudinaryWithProgress(
//         mainImage.src,
//         (p) => updateGlobalProgress(p)
//       );

//       uploaded++;
//       setProgress((uploaded / total) * 100);

//       mainImage = { ...mainImage, src: url };
//     }

//     // --- UPLOAD ARTICLE CONTENT ---
//     const articleContent = await Promise.all(
//       data.articleContent.map(async (item) => {
//         if (item.type === "image" && item.value.src instanceof File) {
//           const url = await uploadToCloudinaryWithProgress(
//             item.value.src,
//             (p) => updateGlobalProgress(p)
//           );

//           uploaded++;
//           setProgress((uploaded / total) * 100);

//           return {
//             ...item,
//             value: { ...item.value, src: url },
//           };
//         }

//         return item;
//       })
//     );

//     const updatedData = { ...data, articleContent, mainImage };

//     console.log("FINAL", updatedData);
//   } catch (error) {
//     console.error(error);
//   }
// };


// export async function uploadToCloudinaryWithProgress(
//   file: File,
//   onProgress?: ProgressCallback
// ): Promise<string> {
//   const url = `https://api.cloudinary.com/v1_1/<CLOUD_NAME>/upload`;

//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", "<UPLOAD_PRESET>");

//   const res = await axios.post(url, formData, {
//     onUploadProgress: (e) => {
//       if (onProgress) {
//         const percent = Math.round((e.loaded * 100) / (e.total ?? 1));
//         onProgress(percent);
//       }
//     },
//   });

//   return res.data.secure_url as string;
// }