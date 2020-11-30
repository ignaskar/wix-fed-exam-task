import React from 'react';

interface ILabelListItemProps {
    label: string;
}

const LabelListItem = ({ label }: ILabelListItemProps) => {
    return <li>{label}</li>;
};

export default LabelListItem;
