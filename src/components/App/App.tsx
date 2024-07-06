// src/components/App/App.tsx
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Toaster } from "react-hot-toast";

const UNSPLASH_ACCESS_KEY = "3OlXvuZbRHK9s2Dy0FM9kwuZNu-SdkMmsN9gymFhE8k";

interface UnsplashUrls {
  small: string;
  regular: string;
}

interface UnsplashImage {
  id: string;
  urls: UnsplashUrls;
  alt_description: string;
}

interface UnsplashResponse {
  results: UnsplashImage[];
}

const App: React.FC = () => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [largeImageURL, setLargeImageURL] = useState<string>("");
  const [noMoreImages, setNoMoreImages] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const firstNewImageRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      setNoMoreImages(false);
      setError("");

      try {
        const response = await axios.get<UnsplashResponse>(
          "https://api.unsplash.com/search/photos",
          {
            params: { query, page, per_page: 14 },
            headers: {
              Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
            },
          }
        );

        if (response.status === 200) {
          const newImages = response.data.results.filter(
            (result: UnsplashImage) => !images.find((image) => image.id === result.id)
          );

          if (newImages.length === 0 && images.length > 0) {
            setNoMoreImages(true);
            setError("No more images found.");
          } else if (newImages.length === 0 && images.length === 0) {
            setError("No images found for this query.");
          } else {
            setImages((prevImages) => [...prevImages, ...newImages]);
          }
        } else {
          setError("Something went wrong. Please try again.");
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  useEffect(() => {
    if (page > 1 && firstNewImageRef.current) {
      firstNewImageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [images]);

  const handleSearchSubmit = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
    setNoMoreImages(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (imageURL: string) => {
    setLargeImageURL(imageURL);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImageURL("");
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearchSubmit} />
      <ImageGallery
        images={images}
        onImageClick={openModal}
        firstNewImageRef={firstNewImageRef}
      />
      {loading && <Loader />}
      {images.length > 0 && !loading && !noMoreImages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {showModal && (
        <ImageModal imageURL={largeImageURL} onClose={closeModal} />
      )}
      {error && <ErrorMessage message={error} />}
      <Toaster />
    </div>
  );
};

export default App;
