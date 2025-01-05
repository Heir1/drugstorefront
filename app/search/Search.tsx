import React, { useState } from 'react';
import Select, { SingleValue, ActionMeta } from 'react-select';

interface Option {
    value: string;
    label: string;
}
  
const options: Option[] = [
{ value: 'apple', label: 'Apple' },
{ value: 'banana', label: 'Banana' },
{ value: 'cherry', label: 'Cherry' },
];

export default function Search() {
    const [selectedOption, setSelectedOption] = useState<SingleValue<Option>>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [hasFocus, setHasFocus] = useState<boolean>(false);
  
  // Fonction pour capturer les modifications du texte de l'input
  const handleInputChange = (newInputValue: string) => {
    setInputValue(newInputValue);
  };

  
  // Fonction pour gérer la perte de focus du sélecteur
  const handleBlur = () => {
    setHasFocus(false);
    // Si l'input n'est pas vide et que l'option n'existe pas, loggez-le
    if (inputValue && !options.find(option => option.label.toLowerCase() === inputValue.toLowerCase())) {
      console.log('Mot saisi (non trouvé dans la liste):', inputValue);
    }
  };
  
  // Fonction pour gérer le focus du sélecteur
  const handleFocus = () => {
    setHasFocus(true);
  };

  // Lors de la soumission du formulaire ou de l'action de validation
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Option sélectionnée:', selectedOption);
    if (inputValue && !options.find(option => option.label.toLowerCase() === inputValue.toLowerCase())) {
      console.log('Mot saisi qui ne correspond à aucune option:', inputValue);
    }
    // Réinitialisation de l'input après soumission
    setInputValue('');
    setSelectedOption(null);
  };
  
    return (
        <form onSubmit={handleFormSubmit}>
        <Select
          value={selectedOption}
          onChange={(newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => {
            setSelectedOption(newValue);
            // Réinitialiser l'input lorsque l'option est sélectionnée
            setInputValue('');
          }}
          options={options}
          onInputChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          inputValue={inputValue}
          isClearable
        />
        <button type="submit">Valider</button>
      </form>
    );
  
}
