import InputComponent from "@/components/input/InputCustom"
import { useState } from "react"
import { FaStar } from "react-icons/fa"

interface IActivityInputProps {
    index: number
    activity: IActivity
    onActivityChange: (index: number, field: string, value: string | number) => void
}

export interface IActivity {
    name: string
    lattitude: string
    longitude: string
    startAt: string
    endAt: string
    url: string
    photo: string
    rating: number
    [key: string]: string | number
}

export const ActivityInput: React.FC<IActivityInputProps> = ({ index, activity, onActivityChange }) => {
    const [name, setName] = useState<string>(activity.name)
    const [lattitude, setLatitude] = useState<string>(activity.lattitude)
    const [longitude, setLongitude] = useState<string>(activity.longitude)
    const [startDate, setStartDate] = useState<string>(activity.startAt)
    const [endDate, setEndDate] = useState<string>(activity.endAt)
    const [url, setUrl] = useState<string>(activity.url)
    const [photoUrl, setPhotoUrl] = useState<string>(activity.photo)
    const [rank, setRank] = useState<number>(activity.rating)
    const [hover, setHover] = useState<number>(0)
    
    function handleRankChange(value: number) {
        setRank(parseFloat(value.toString()));
        onActivityChange(index, "rating", parseFloat(value.toString()));
    }

    return (
        <div>
            <div className="mb-4" key={index}>
                <div className="bg-white p-4 rounded-lg shadow" key={index}>
                    <div className="flex flex-row">
                        <div className="w-1/2 px-2" key={`lattitude-${index}`}>
                            <InputComponent
                                labelName="Latitude"
                                placeholder="Latitude"
                                typeInput="text"
                                value={lattitude}
                                onBlur={(value) => onActivityChange(index, "lattitude", value)}
                                onValueChange={(value) => setLatitude(value)}
                            />
                        </div>
                        <div className="w-1/2 px-2" key={`longitude-${index}`}>
                            <InputComponent
                                labelName="Longitude"
                                placeholder="Longitude"
                                typeInput="text"
                                value={longitude}
                                onBlur={(value) => onActivityChange(index, "longitude", value)}
                                onValueChange={(value) => setLongitude(value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="w-1/2 px-2" key={`startDate-${index}`}>
                            <InputComponent
                                labelName="Date de début"
                                placeholder=""
                                typeInput="date"
                                value={startDate}
                                onBlur={(value) => onActivityChange(index, "startAt", value)}
                                onValueChange={(value) => setStartDate(value)}
                            />
                        </div>
                        <div className="w-1/2 px-2" key={`endDate-${index}`}>
                            <InputComponent
                                labelName="Date de fin"
                                placeholder=""
                                typeInput="date"
                                value={endDate}
                                onBlur={(value) => onActivityChange(index, "endAt", value)}
                                onValueChange={(value) => setEndDate(value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="w-full px-2" key={`name-${index}`}>
                            <InputComponent
                                labelName="Nom"
                                placeholder="Nom"
                                typeInput="text"
                                value={name}
                                onBlur={(value) => onActivityChange(index, "name", value)}
                                onValueChange={(value) => setName(value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="w-1/2 px-2" key={`url-${index}`}>
                            <InputComponent
                                labelName="Url de l'anonce"
                                placeholder="https://..."
                                typeInput="text"
                                value={url}
                                onBlur={(value) => onActivityChange(index, "url", value)}
                                onValueChange={(value) => setUrl(value)}
                            />
                        </div>
                        <div className="w-1/2 px-2" key={`picUrl-${index}`}>
                            <InputComponent
                                labelName="Url photo"
                                placeholder="https://..."
                                typeInput="text"
                                value={photoUrl}
                                onBlur={(value) => onActivityChange(index, "photo", value)}
                                onValueChange={(value) => setPhotoUrl(value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row pt-3">
                        <div className="w-full px-3" key={`rank-${index}`}>
                            <div className="flex items-center">
                                <span className="text-lg font-semibold mr-3">Avis du logement: </span>
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        size={30}
                                        className="cursor-pointer"
                                        color={i < (hover || rank) ? "#ffc107" : "#e4e5e9"}
                                        onMouseEnter={() => setHover(i + 1)}
                                        onMouseLeave={() => setHover(rank)}
                                        onClick={() => handleRankChange(i + 1)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
