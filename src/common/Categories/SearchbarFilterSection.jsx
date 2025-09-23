import { IoSearchOutline } from "react-icons/io5";
import { VscSettings } from "react-icons/vsc";

const SearchbarSection = () => {
    return (<>
        <section className="bg_background">
            <div className="flex flex-col xl:flex-row gap-4 items-center justify-center lg:justify-between bg-white lg:bg-[#F5F5F7] p-4 rounded-md mb-4">
                <h2 className="text_primary font-bold subheading text-center flex-shrink-0">Information Technology</h2>
                <div className="flex items-center justify-center xl:justify-between w-full gap-4">
                    <div className="relative w-full max-w-md lg:max-w-xl">
                        <input type='text' placeholder='Search By Categories, Postcode, etc' className="bg-[#F5F5F7] lg:bg-white pl-10 p-2 rounded-full w-full" />
                        <IoSearchOutline className="absolute top-1/2 left-4 transform -translate-y-1/2 " />
                    </div>
                    <div className={`hidden lg:flex bg_secondary rounded-full py-2 px-3 items-center justify-center gap-2 w-[100px]`}>
                        <p className="text_white">Filters</p>
                        <VscSettings className="text_white" size={25} />
                    </div>
                    <div className="block lg:hidden" >
                        <VscSettings className="p-2 text_primary bg_background lg:bg_white rounded-full" size={40} />
                    </div>
                    {/* <AnimatePresence>
                        {isModalOpen && (
                            <ModalContent onClose={() => setIsModalOpen(false)} categoryList={categoryArr} ToggleButtonValues={ToggleButtonValues} activeTab={activeTab} setActiveTab={setActiveTab} />
                        )}
                    </AnimatePresence> */}
                </div>
            </div>

        </section>
    </>)
}
export default SearchbarSection;