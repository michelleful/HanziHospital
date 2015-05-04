// Pseudo-code for deck view.
// A deck view is the container for a set of HanziHospital challenges ( quizzes? tests?).

class DeckView({
    renderSlide(slideData) {
        var slide = new Slide(slideData));
        this.slideRegion.show(slide);
        this.currentSlide = slide;

        slide.on('complete', function() {
            nextSlide();
        });
    },
    nextSlide(){},
});
