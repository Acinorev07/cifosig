const smartVideo = () => {

    const $videos = document.querySelectorAll("video[data-smart-video]");

    const cb = (entries: IntersectionObserverEntry[]) => {

        entries.forEach(entry => {

           const video = entry.target as HTMLVideoElement;

            if (entry.isIntersecting) {

                video.play().catch(err => {
                    console.log(err);
                });

            } else {

                video.pause();

            }

        });

    };

    const observer = new IntersectionObserver(cb, {
        threshold: 0.5
    });

    $videos.forEach(video => observer.observe(video));

};

export default smartVideo;