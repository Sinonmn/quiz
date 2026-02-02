const imagesContext = import.meta.glob("../../assets/сatsPictures/*.jpg", {
  eager: true,
});


export const catImages = Object.values(imagesContext).map(
  (module) => module.default,
);
