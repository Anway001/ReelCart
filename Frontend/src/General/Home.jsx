import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';


// const videos = [
//     {
//         url: 'https://www.w3schools.com/html/mov_bbb.mp4',
//         description: 'Welcome to Burger Palace! Try our delicious burgers and fries at the best price in town. Order now!'
//     },
//     {
//         url: 'https://www.w3schools.com/html/movie.mp4',
//         description: 'Pizza World: Hot, cheesy pizzas delivered to your doorstep. Taste the difference today!'
//     },
//     {
//         url: 'https://www.w3schools.com/html/mov_bbb.mp4',
//         description: 'Sushi Express: Fresh sushi rolls and sashimi. Visit us for an authentic Japanese experience.'
//     }
// ];

function truncateText(text) {
    // Simple truncation for demo; in production, use CSS line-clamp
    const maxLength = 90;
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

function Home() {
    const containerRef = useRef(null);
    const videoRefs = useRef([]);
    const activeIndexRef = useRef(0);
    const targetIndexRef = useRef(null);
    const scrollTimeoutRef = useRef(null);
    const isAnimatingRef = useRef(false);
    const [videos, setVideos] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:8080/api/food", { withCredentials: true })
            .then(response => {
                if (response.data && response.data.foodItems) {
                    setVideos(response.data.foodItems);
                    setActiveIndex(0);
                }
            })
            .catch(err => {
                console.error("Error fetching food items:", err);
            });
    }, []);

    useEffect(() => {
        videoRefs.current = videoRefs.current.slice(0, videos.length);
    }, [videos.length]);

    useEffect(() => {
        activeIndexRef.current = activeIndex;
    }, [activeIndex]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        const handleWheel = (event) => {
            if (!videos.length) {
                return;
            }
            event.preventDefault();
            if (isAnimatingRef.current) {
                return;
            }
            const direction = event.deltaY > 0 ? 1 : -1;
            const nextIndex = Math.min(Math.max(activeIndexRef.current + direction, 0), videos.length - 1);
            if (nextIndex === activeIndexRef.current) {
                return;
            }
            isAnimatingRef.current = true;
            targetIndexRef.current = nextIndex;
            container.scrollTo({
                top: nextIndex * container.clientHeight,
                behavior: 'smooth'
            });
            setActiveIndex(nextIndex);
        };

        const handleScroll = () => {
            if (!videos.length) {
                return;
            }
            const { scrollTop, clientHeight } = container;
            const index = Math.round(scrollTop / clientHeight);
            if (!isAnimatingRef.current && index !== activeIndexRef.current) {
                setActiveIndex(index);
            }
            if (targetIndexRef.current !== null) {
                const expected = targetIndexRef.current * clientHeight;
                if (Math.abs(scrollTop - expected) < 1) {
                    isAnimatingRef.current = false;
                    targetIndexRef.current = null;
                }
            }
            if (scrollTimeoutRef.current) {
                window.clearTimeout(scrollTimeoutRef.current);
            }
            scrollTimeoutRef.current = window.setTimeout(() => {
                if (!videos.length) {
                    return;
                }
                const finalIndex = Math.round(container.scrollTop / container.clientHeight);
                if (finalIndex !== activeIndexRef.current) {
                    setActiveIndex(finalIndex);
                }
                targetIndexRef.current = finalIndex;
                container.scrollTo({
                    top: finalIndex * container.clientHeight,
                    behavior: 'smooth'
                });
                window.setTimeout(() => {
                    isAnimatingRef.current = false;
                    targetIndexRef.current = null;
                }, 250);
            }, 120);
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        container.addEventListener('scroll', handleScroll);

        return () => {
            container.removeEventListener('wheel', handleWheel);
            container.removeEventListener('scroll', handleScroll);
            if (scrollTimeoutRef.current) {
                window.clearTimeout(scrollTimeoutRef.current);
                scrollTimeoutRef.current = null;
            }
            targetIndexRef.current = null;
            isAnimatingRef.current = false;
        };
    }, [videos.length]);

    useEffect(() => {
        if (!videos.length) {
            return;
        }
        videoRefs.current.forEach((video, index) => {
            if (!video) {
                return;
            }
            if (index === activeIndex) {
                const playPromise = video.play();
                if (playPromise && typeof playPromise.catch === 'function') {
                    playPromise.catch(() => {});
                }
            } else {
                video.pause();
                video.currentTime = 0;
            }
        });
    }, [activeIndex, videos.length]);

    return (
        <div className="reels-container" ref={containerRef}>
            {videos.map((item, index) => (
                <div className="reel" key={item._id}>
                    <video
                        ref={(element) => {
                            videoRefs.current[index] = element;
                        }}
                        className="reel-video"
                        src={item.video}
                        controls={false}
                        loop
                        muted
                        
                    />
                    <div className="reel-overlay">
                        <div className="reel-description">
                            {truncateText(item.name)}
                        </div>
                        <Link to={`/partner/${item.foodpartner}`} className="reel-button">Visit Store !!</Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;
