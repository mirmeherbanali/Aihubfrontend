module.exports = {
    content: [
        './app/**/*.{js,ts,jsx}',
        './components/**/*.{js,ts,jsx}',
        './src/**/*.{js,ts,jsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#035140',
                secondary: '#009F7D',
                black: '#333333',
                background: '#F5F5F7',
                accent_red: '#DF0000',
                acent_orange: '#CA8200',
                accent_green: '#73CF11',
                accent_yellow: '#DFC100',
            },
            fontSize: {
                'headiing': '50px',
                'sub_heading': '26px',
                'sub_heading_1': '22px',
                'content': '17px',
                'content_1': '17px',
            },
            fontFamily: {
                'poppins': ['Poppins', 'sans-serif'],
                'roboto': ['Roboto', 'sans-serif'],
                'montserrat': ['Montserrat', 'sans-serif'],
                'inter': ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
};