import ToggleSwitch from '@/common/SwitchToggle/ToggleSwitchButton';

const ToggleOpsation = ({ titel, description, defaultChecked, handleToggle }) => {

    return (
        <div className="bg_background p-5 rounded-[20px] mb-3 lg:mb-4 xl:mb-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-y-2">
                    <p className="text_black font-semibold capitalize">{titel}</p>
                    <p className="text_black font-normal capitalize">{description}</p>
                </div>
                <ToggleSwitch
                    defaultChecked={defaultChecked}
                    onToggle={(value) => handleToggle(value, titel)}
                />
            </div>
        </div>
    )
}

export default ToggleOpsation