import React, { useState } from 'react'

const DataConsentSettings = () => {
    const [dataConsent, setDataConsent] = useState([
        { name: "Cookie permissions", description: "You agree that Dragon Customer will place cookies on your webshop to invite and verify customer reviews. Ensure user consent is obtained and update your privacy policy if required.", status: true },
        { name: "Account Management", description: "Enable this to allow Dragon Customer to assist with your account setup or support, like editing details. Disable to withdraw permission.", status: false },
        { name: "Partnership permission", description: "This permission lets you use Dragon Customer-approved integrations. To stop sharing review data, remove access via the control panel.", status: true },
    ]);

    const toggleStatus = (index) => {
        const updated = [...dataConsent];
        updated[index].status = !updated[index].status;
        setDataConsent(updated);
    };

    return (
        <div>
            <div className='rounded-2xl py-5 space-y-2'>
                <h2 className='heading text_primary'>Data Consent</h2>
                <p className='text_black'>Manage your business authorizations.</p>
            </div>
            {dataConsent?.map((data, index) => (
                <div key={index} className='rounded-2xl p-5 my-3 space-y-3 bg_background'>
                    <div className='flex items-center justify-between'>
                        <div className='space-y-2 max-w-4xl'>
                            <h2 className='text_black content'>{data?.name}</h2>
                            <p className='text_black content1'>{data?.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                id={`checkbox-${index}`}
                                checked={data?.status}
                                onChange={() => toggleStatus(index)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-300 peer-checked:bg-[#009F7D] transition-all"></div>
                            <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white border rounded-full transition-all peer-checked:translate-x-full peer-checked:border-white"></div>
                        </label>
                    </div>
                </div>
            ))}
            <div className='rounded-2xl p-5 my-3 space-y-3 bg_background'>
                <h2 className='text_black content'>We take privacy seriously</h2>
                <p className='text_black content1'>For any question about data security or protection, Dragon Customer's Privacy Team at <br /><span className='text_secondary'>privacy@dragoncustomer.com</span></p>
            </div>
        </div>
    )
}

export default DataConsentSettings
