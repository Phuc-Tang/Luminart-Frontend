import classNames from 'classnames/bind';
import styles from '../../styles/pages/Sections/Showcase.module.scss';

const cx = classNames.bind(styles);

function About() {
    return <div className={cx('frame')}>About</div>;
}

export default About;
