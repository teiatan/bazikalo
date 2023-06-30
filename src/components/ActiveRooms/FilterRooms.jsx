export const FilterRooms = () => {
    const roomTypes = ['всі', 'групові', '1х1']
    return (
        <div className="w-full flex justify-stretch gap-1">
            {roomTypes.map(type =>
                (<button key={type} className="border w-full">{type}</button>)
            )}
        </div>
    )
};