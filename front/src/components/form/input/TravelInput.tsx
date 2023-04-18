import InputComponent from "@/components/input/InputCustom"
import { useState } from "react";

interface ITravelInputProps {
    index: number;
    travel: ITravel;
    onTravelChange: (index: number, field: string, value: string) => void;
}

export interface ITravel {
    lattitude: string;
    longitude: string;
    startAt: string;
    endAt: string;
    url: string;
    travelKind: string;
    lattitudeArrival: string;
    longitudeArrival: string;
    waypointLattitudeTwo: string;
    [key: string]: string;
  }

export const TravelInput: React.FC<ITravelInputProps> = ({ index, travel, onTravelChange }) => {

    const [lattitude, setLatitude] = useState<string>(travel.lattitude);
    const [longitude, setLongitude] = useState<string>(travel.longitude);
    const [lattitudeArrival, setLatitudeArrival] = useState<string>(travel.lattitudeArrival);
    const [longitudeArrival, setLongitudeArrival] = useState<string>(travel.longitudeArrival);
    const [startDate, setStartDate] = useState<string>(travel.startAt);
    const [endDate, setEndDate] = useState<string>(travel.endAt);
    const [url, setUrl] = useState<string>(travel.url);

    return (
        <div className="mb-4" key={index}>
            <div className="bg-white p-4 rounded-lg shadow" key={index}>
                <div className="flex flex-row">
                    <div className="w-1/2 px-2" key={`lattitude-${index}`}>
                        <InputComponent
                            labelName="Latitude départ"
                            placeholder="Latitude"
                            typeInput="text"
                            value={lattitude}
                            onValueChange={(value) => setLatitude(value)}
                            onBlur={() => {
                                onTravelChange(index, "lattitude", lattitude);
                            }
                            }
                        />
                    </div>
                    <div className="w-1/2 px-2" key={`longitude-${index}`}>
                        <InputComponent
                            labelName="Longitude départ"
                            placeholder="Longitude"
                            typeInput="text"
                            value={longitude}
                            onValueChange={(value) => setLongitude(value)}
                            onBlur={() => {
                                onTravelChange(index, "longitude", longitude);
                            }
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="w-1/2 px-2" key={`lattitudeArrival-${index}`}>
                        <InputComponent
                            labelName="Latitude arrivée"
                            placeholder="Latitude"
                            typeInput="text"
                            value={lattitudeArrival}
                            onValueChange={(value) => setLatitudeArrival(value)}
                            onBlur={() => {
                                onTravelChange(index, "lattitudeArrival", lattitudeArrival);
                            }
                            }
                        />
                    </div>
                    <div className="w-1/2 px-2" key={`longitudeArrival-${index}`}>
                        <InputComponent
                            labelName="Longitude arrivée"
                            placeholder="Longitude"
                            typeInput="text"
                            value={longitudeArrival}
                            onValueChange={(value) => setLongitudeArrival(value)}
                            onBlur={() => {
                                onTravelChange(index, "longitudeArrival", longitudeArrival);
                            }
                            }
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
                            onValueChange={(value) => setStartDate(value)}
                            onBlur={() => {
                                onTravelChange(index, "startAt", startDate);
                            }
                            }
                        />
                    </div>
                    <div className="w-1/2 px-2" key={`endDate-${index}`}>
                        <InputComponent
                            labelName="Date de fin"
                            placeholder=""
                            typeInput="date"
                            value={endDate}
                            onValueChange={(value) => setEndDate(value)}
                            onBlur={() => {
                                onTravelChange(index, "endAt", endDate);
                            }
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="w-full px-2" key={`url-${index}`}>
                        <InputComponent
                            labelName="URL du voyage"
                            placeholder="URL"
                            typeInput="text"
                            value={url}
                            onValueChange={(value) => setUrl(value)}
                            onBlur={() => {
                                onTravelChange(index, "url", url);
                            }
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}