'use client';
import { motion } from 'framer-motion';

const Loading = () => {
    return (
        <div className="bg-black/30 backdrop-blur-lg w-full h-screen flex justify-center items-center">
            <motion.svg initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} width="158" height="157" viewBox="0 0 158 157" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }} d="M146.823 37.3594C153.949 48.9012 157.516 62.5504 157.516 78.3096C157.516 94.1207 153.861 107.919 146.552 119.703C139.243 131.338 129.1 140.437 116.123 147C103.146 153.414 88.1547 156.62 71.1504 156.62H7.92969L39.0059 126.862H69.3604C79.8015 126.862 88.8264 124.923 96.4336 121.045C104.19 117.018 110.157 111.35 114.333 104.041C118.659 96.7321 120.821 88.1541 120.821 78.3096C120.821 73.4645 120.311 68.9524 119.294 64.7734L146.823 37.3594ZM71.1504 0C88.1547 7.84125e-05 103.146 3.28164 116.123 9.84473C116.476 10.019 116.826 10.1959 117.175 10.374L93.2002 34.2471C86.3062 31.2552 78.3597 29.7579 69.3604 29.7578H36.2461V110.248L0 144.957V0H71.1504Z" stroke="#035140" strokeWidth="3" />
            </motion.svg>

            <motion.svg initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} width="158" height="157" viewBox="0 0 158 157" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }} d="M10.6934 37.3594C3.56743 48.9012 0.00105286 62.5504 0.000976562 78.3096C0.0010376 94.1207 3.65593 107.919 10.9648 119.703C18.2738 131.338 28.4167 140.437 41.3936 147C54.3706 153.414 69.3619 156.62 86.3662 156.62H146.738L110.128 126.862H88.1562C77.7151 126.862 68.6902 124.923 61.083 121.045C53.3269 117.018 47.36 111.35 43.1836 104.041C38.8579 96.7321 36.6954 88.1541 36.6953 78.3096C36.6953 73.4645 37.2059 68.9524 38.2227 64.7734L10.6934 37.3594ZM86.3662 0C69.3619 7.88933e-05 54.3706 3.28164 41.3936 9.84473C41.041 10.019 40.6902 10.1959 40.3418 10.374L64.3164 34.2471C71.2104 31.2552 79.1569 29.7579 88.1562 29.7578H121.271V49.8271L157.391 0H86.3662Z" stroke="#035140" strokeWidth="3" />
            </motion.svg>
        </div>
    );
};

export default Loading;