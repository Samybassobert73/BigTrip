import { useState } from "react"
import InputComponent from "../input/InputCustom";
import { ITravel, TravelInput } from "./input/TravelInput";
import { HousingInput, IHousing } from "./input/HousingInput";
import { ActivityInput, IActivity } from "./input/ActivityInput";
import TripServices from "_services/trip";


export interface IAddTrip {
  name: string;
  startAt: string;
  endAt: string;
  TripTravel: ITravel[];
  TripHousing: IHousing[];
  TripActivity: IActivity[];
}



const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [trip, setTrip] = useState<IAddTrip>({ name: "", startAt: "", endAt: "", TripTravel: [], TripHousing: [], TripActivity: [] });

  const [name, setName] = useState<string>("")
  const [startAt, setStartAt] = useState<string>("")
  const [endAt, setEndAt] = useState<string>("")
  const [housings, setHousings] = useState<IHousing[]>([
    { name: "", lattitude: "", longitude: "", startAt: "", endAt: "", url: "", photo: "", rating: 0, type: "activité" },
  ]);
  const [activities, setActivities] = useState<IActivity[]>([
    { name: "", lattitude: "", longitude: "", startAt: "", endAt: "", url: "", photo: "", rating: 0 },
  ]); const [travels, setTravels] = useState<ITravel[]>([
    { lattitude: "", longitude: "", startAt: "", endAt: "", url: "", travelKind: "", lattitudeArrival: "", longitudeArrival: "", waypointLattitudeTwo: ""},
  ]);
  const services = new TripServices()


  const handleNext = () => {
    if (step === 4) {
      let _ = { ...trip };
      _.TripHousing = housings.map((h) => {
        return { ...h, type: "activité" }}).filter((h) => h.name !== "")
        
      _.TripActivity = activities.map((a) => {
        return { ...a, type: "activité" }}).filter((a) => a.name !== "")

      _.TripTravel = travels.map((t) => {
        return { ...t, travelKind: "carte bleu", waypointLattitudeTwo: "12" }}).filter((t) => t.lattitude !== "" && t.longitude !== "")
      _.name = name;
      _.startAt = startAt ? startAt : "";
      _.endAt = endAt ? endAt : "";
      services.createTrip(_).then((res) => {
        // SUITE DE L'ACTION ICI LORS DE LA CREATION DU TRIP
        console.log(res)
      })

    }else{
      setStep(step + 1);
    }

  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const Step1 = () => {
    const [name_, setName_] = useState<string>(name);

    function handleNameChange() {
      setName(name_);
    }

    function handleEndAtChange(dates: string) {
      setEndAt(dates);
    }
    function handleStartAtChange(dates: string) {
      setStartAt(dates);
    }

    return (
      <div>
        <h3 className="text-lg font-medium mb-4">Décrivez votre trip</h3>
        
        <div className="mb-4">
          <InputComponent
            labelName="Nom du trip"
            placeholder="Nom"
            typeInput="text"
            value={name_}
            onValueChange={(s) => setName_(s)}
            onBlur={() => handleNameChange()}
          />
        </div>
        <div className="flex flex-row">
        <div className="w-1/2 px-2">
          <InputComponent
            labelName="Date de départ"
            placeholder=""
            typeInput="date"
            value={startAt}
            onValueChange={handleStartAtChange}
          />
        </div>
        <div className="w-1/2 px-2">
          <InputComponent
            labelName="Date de fin"
            placeholder=""
            typeInput="date"
            value={endAt}
            onValueChange={handleEndAtChange}
          />
        </div>
        </div>
      </div>
    );
  };

  const Step2 = () => {
    function handleAddInput() {
      setTravels([...travels, { lattitude: '', longitude: '', startAt: '', endAt: '', url: '', travelKind: '', lattitudeArrival: '', longitudeArrival: '', waypointLattitudeTwo:'' }]);
    }

    function handleTravelChange(index: number, field: string, value: string) {
      const newTravels = [...travels];
      newTravels[index][field] = value;
      setTravels(newTravels);
    }

    return (
      <div>
        <h3 className="text-lg font-medium mb-4">Quels lieux voulez-vous explorer ?</h3>
        {travels.map((travel, index) => (
          <TravelInput key={index} index={index} travel={travel} onTravelChange={handleTravelChange} />
        ))}
        <button onClick={handleAddInput}>Ajouter un voyage</button>
      </div>
    );
  };

  const Step3 = () => {
    function handleAddInput() {
      setHousings([...housings, { name: '', lattitude: '', longitude: '', startAt: '', endAt: '', url: '', photo: '', rating: 0, type: "activité" }]);
    }

    function handleHousingChange(index: number, field: string, value: string) {
      const newHousings = [...housings];
      newHousings[index][field] = value;
      setHousings(newHousings);
    }

    return (
      <div>
        <h3 className="text-lg font-medium mb-4">Ou souhaitez vous dormir</h3>
        {housings.map((housing, index) => (
          //@ts-ignore
          <HousingInput key={index} index={index} housing={housing} onHousingChange={handleHousingChange} />
        ))}
        <button onClick={handleAddInput}>Ajouter un logement</button>
      </div>
    );
  };

  const Step4 = () => {
    function handleAddInput() {
      setActivities([...housings, { name: '', lattitude: '', longitude: '', startAt: '', endAt: '', url: '', photo: '', rating: 0 }]);
    }

    function handleActivitiesChange(index: number, field: string, value: string) {
      const newActivities = [...activities];
      newActivities[index][field] = value;
      setActivities(newActivities);
    }

    return (
      <div>
        <h3 className="text-lg font-medium mb-4">Quelles activitées souhaitez vous faire ?</h3>
        {activities.map((activity, index) => (
          //@ts-ignore
          <ActivityInput key={index} index={index} activity={activity} onActivityChange={handleActivitiesChange} />
        ))}
        <button onClick={handleAddInput}>Ajouter une activité</button>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-full lg:max-w-xl">
        <h2 className="text-lg font-medium mb-4">Étape {step} sur 4</h2>
        <div className="flex mb-4">
          <div
            className={`w-1/2 border-r border-gray-400 ${step === 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              } p-2 text-center cursor-pointer rounded-l-lg`}

          >
            Informations
          </div>
          <div
            className={`w-1/2 border-r border-gray-400 ${step === 2 ? "bg-blue-500 text-white" : "bg-gray-200"
              } p-2 text-center cursor-pointer`}

          >
            Vols
          </div>
          <div
            className={`w-1/2 border-r border-gray-400 ${step === 3 ? "bg-blue-500 text-white" : "bg-gray-200"
              } p-2 text-center cursor-pointer`}

          >
            Logements
          </div>
          <div
            className={`w-1/2 ${step === 4 ? "bg-blue-500 text-white" : "bg-gray-200"
              } p-2 text-center cursor-pointer rounded-r-lg`}
          >
            Activitées
          </div>
        </div>
        {step === 1 ? <Step1 /> : null}
        {step === 2 ? <Step2 /> : null}
        {step === 3 ? <Step3 /> : null}
        {step === 4 ? <Step4 /> : null}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              className="bg-gray-300 px-6 py-1.5 rounded-lg text-gray-700 hover:bg-gray-400"
              onClick={handleBack}
            >
              Retour
            </button>
          )}
          {step < 4 && (
            <button
              className="bg-blue-500 px-6 py-1.5 rounded-lg text-white hover:bg-blue-600"
              onClick={() => {
                handleNext();
                console.log(travels)
              }}
            >
              Suivant
            </button>
          )}
          {step === 4 && (
            <button
              className="bg-blue-500 px-6 py-1.5 rounded-lg text-white hover:bg-blue-600"
              onClick={handleNext}
            >
              Valider
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default MultiStepForm;