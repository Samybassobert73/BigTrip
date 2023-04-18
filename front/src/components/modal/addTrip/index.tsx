import MultiStepForm from "@/components/form/MultistepForm"



export const AddTripModal = () => {


    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 overflow-y-auto">
                    <MultiStepForm/>
            </div>
        </div>
    )
}