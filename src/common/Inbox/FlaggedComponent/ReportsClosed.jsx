const ReportsClosed = () => {

    return (
        <div className='w-full flex flex-col lg:flex-row gap-4'>
            <div className='w-full lg:w-1/2'>
                <h2 className='text_primary font-bold subheading pb-4'>Reports Closed</h2>
                <div className='bg_white rounded-xl flex gap-[10px] py-4 px-4 items-center'>
                    <p className='text_black font-bold reportcount' >0</p>
                    <p className='content1'>Review Moved Offline</p>
                </div>
            </div>
            <div className='w-full lg:w-1/2'>
                <h2 className='text_primary font-bold subheading pb-4'><span className='hidden lg:inline'>Review</span> Stayed Online</h2>
                <div className='bg_white rounded-xl flex gap-[10px] py-4 px-4 items-center'>
                    <p className='text_black font-bold reportcount'>0</p>
                    <p className='content1'>Under Investigation</p>
                </div>
            </div>
        </div>
    )
};

export default ReportsClosed;