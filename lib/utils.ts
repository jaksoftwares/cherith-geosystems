export function optimizeImage(url: string, width: number = 800): string {
  if (!url) return "";
  
  if (url.includes("res.cloudinary.com")) {
    // If it already has transformations, just return it or replace them
    if (url.includes("f_auto")) return url;

    // Inject format auto, quality auto, and width
    if (url.includes("/upload/v")) {
      return url.replace("/upload/v", `/upload/f_auto,q_auto,w_${width}/v`);
    } else if (url.includes("/upload/")) {
      return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
    }
    return url;
  }
  
  if (url.includes("images.unsplash.com")) {
    // Inject formatting for Unsplash
    let newUrl = url.replace(/&w=\d+/, "");
    if (!newUrl.includes("?")) newUrl += "?";
    if (!newUrl.includes("auto=format")) newUrl += "&auto=format";
    if (!newUrl.includes("q=")) newUrl += "&q=80";
    return newUrl + `&w=${width}`;
  }

  return url;
}
