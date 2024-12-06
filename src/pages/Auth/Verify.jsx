import classNames from 'classnames/bind';
import styles from '../../styles/pages/Auth.module.scss';
import { verifyEmailForm } from '../../hooks/useAuth';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Verify() {
    const { isLoading, message, error } = verifyEmailForm();
    console.log(message);

    return (
        <div className={cx('frame')}>
            <div>{message}</div>
            <div className={cx('navigate')}>
                <p>Please login in here: </p>
                <a href="http://localhost:5173/signin">http://localhost:5173/signin</a>
            </div>
        </div>
    );
}

export default Verify;
