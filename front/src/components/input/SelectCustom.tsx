import React, {useState} from 'react';
import styles from './InputCustom.module.css';

type props = {
  value:any,
  labelName:any,
  data:string[]
 
  onChange:any,
  error:any,
}
function SelectComponent({value, data, labelName, onChange, error}:props) {
	const [inputValue,setInputValue] = useState(value || null)

	function toUpperCase(text: string): string {
		return text.charAt(0).toUpperCase() + text.slice(1);
	}	


	return (
		<div className={styles.containerInput}>
			<label>{ toUpperCase(labelName) }</label>
			<select 
 
				onChange={(e)=>{
					setInputValue(e.target.value);
					onChange && onChange(e);
				}}
				className={`${styles.inputCustom} border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
				
				value={inputValue}
			>
				{data.map((activity) => {return(<option value={activity}>{activity}</option>)})}
				
			</select >
			{error && (
				<p className='mt-2 text-red-600'>{error?.message}</p>
			)}
		</div>
	);
};

export default SelectComponent;
