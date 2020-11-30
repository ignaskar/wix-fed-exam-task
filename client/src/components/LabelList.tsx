import React from 'react';
import LabelListItem from "./LabelListItem";
import { v4 as uuidv4 } from 'uuid';

interface ILabelListProps {
    labels: string[];
}

const LabelList = ({labels}: ILabelListProps) => {
    return (
        <ul className="label-list">
            {labels.map(label => (
                <LabelListItem key={uuidv4()} label={label} />
            ))}
        </ul>
    )
}

export default LabelList