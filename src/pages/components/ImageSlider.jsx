import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    FormGroup,
    Label,
    Col,
    Media,
} from 'reactstrap';

import styles from './ImageSlider.scss';

class ImageSlider extends Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.props.items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.props.items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }
    render() {
        const { activeIndex } = this.state;

        const slides = this.props.value.map(src => (
            <CarouselItem
                onExiting={this.onExiting}
                onExited={this.onExited}
                key={src}
            > 
                <img className={styles.ImageList__img} src={src}/>
            </CarouselItem>
        ));

        return (
            <Carousel
                className={this.props.className}
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
                slide={this.props.slide}
            >
                <CarouselIndicators items={this.props.items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>
        );
    }
}

ImageSlider.defaultProps = {
    className: '',
};

ImageSlider.propTypes = {
    className: PropTypes.string,
    items: PropTypes.array.isRequired,
};

export default ImageSlider;
