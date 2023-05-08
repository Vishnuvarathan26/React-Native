import React, { useState } from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const DropdownButton = ({ label, data, containerStyle, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelect = (value) => {
    setSelectedValue(value);
    onSelect(value);
  };

  return (
    <View style={containerStyle}>
      <Dropdown
        label={label}
        value={selectedValue}
        data={data}
        onChangeText={handleSelect}
      />
    </View>
  );
};

export default DropdownButton;
