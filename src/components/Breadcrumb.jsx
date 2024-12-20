import classNames from 'classnames/bind';
import styles from '../styles/components/Breadcrumb.module.scss';

const cx = classNames.bind(styles);

function Breadcrumb({ items }) {
    return (
        <nav aria-label="breadcrumb" className={cx('breadcrumb')}>
            <ol>
                {items &&
                    items.map((item, index) => (
                        <li
                            className={cx('bread', { current: index === items.length - 1 })}
                            key={index}
                            style={{ display: 'inline' }}
                        >
                            {item.link && index !== items.length - 1 ? (
                                <a href={item.link}>{item.label}</a>
                            ) : (
                                <span>{item.label}</span>
                            )}
                            {index < items.length - 1 && <span className={cx('separator')}> / </span>}
                        </li>
                    ))}
            </ol>
        </nav>
    );
}

export default Breadcrumb;
