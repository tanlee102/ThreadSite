import React from 'react'

const CreateTopic = ({formSelection, formState, setFormState, setItemSelection, itemSelection, labelState}) => {

  var obj = {};

  const handleChange = (event) => {
    setItemSelection({key: event.target.value});
  }

  return (
    <div class="fr-create-topic">

        {formSelection ? 
        (formSelection.length > 0 ? 
          <select value={itemSelection.key} onChange={(e) => {handleChange(e)}} >
            {formSelection.map(item => (
                <option key={item.key} value={item.key} selected={item.name==itemSelection.key? "selected": ""}>{item.name}</option>
            ))}
          </select>
          : "")
          : ""
        }

        {Object.keys(formState).map((keyName, i) => (
          labelState[i].tag === 'textarea' ?
          <textarea key={keyName} type="text"  value={formState[keyName]}    
          onChange={e => {
            obj = {...formState};
            obj[keyName] = e.target.value;
            setFormState(obj);
          }} placeholder={labelState[i].label}/> 
          :
          <input key={keyName} type="text"  value={formState[keyName]}    
            onChange={e => {
              obj = {...formState};
              obj[keyName] = e.target.value;
              setFormState(obj);
          }} placeholder={labelState[i].label}/> 
        ))}


    </div>
  )
}

export default CreateTopic
