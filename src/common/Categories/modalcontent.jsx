import { motion } from 'framer-motion';
import { IoCloseCircle } from "react-icons/io5";
import categoryStyle from './categorystyle.module.scss';
import ToggleButton from '../ToggleButton/ToggleButton';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';

const ModalContent = ({ onClose, categoryList, ToggleButtonValues, activeTab, setActiveTab }) => {

    return (
        <section>
            <motion.div
                className={categoryStyle.backdrop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                >
                <motion.div
                    className={categoryStyle.modalcontent}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className='p-2 bg_white'>
                        <div className='border-t-2 w-[50px] text-center text_black mx-auto'>
                        </div>
                        <div className='flex justify-end'><IoCloseCircle size={20} onClick={onClose} /></div>
                        <h2 className='subheading text-center p-2'>Filters</h2>
                        <div className='flex justify-center items-center'><ToggleButton ToggleButton={ToggleButtonValues} activeTab={activeTab} setActiveTab={setActiveTab}/></div>
                        <h3 className='font-semibold text-[14px] py-2'>Sectors Categories</h3>
                        <div className='bg_background p-4 rounded-md'>
                            {categoryList.map((cat, index) => {
                                return (
                                    <div className='flex justify-between items-center' key={index}>
                                        <p>{cat}</p>
                                        {/* <input type="checkbox" name='categories' value={cat} /> */}
                                        <CustomCheckbox name='categories' value={cat} id={cat}/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
};

export default ModalContent;