import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MapState } from '../../redux/reducers/map-reducer';
import { ControlState } from '../../redux/reducers/control-reducer';
import { Legend } from './legend';
import { CaseCard } from './case-card';
import { Cluster } from '../control/control';

interface SummaryProps {
  clusterData: MapState['clusterData'];
  dateEndRange: ControlState['dateEndRange'];
  selectedCase: ControlState['selectedCase'];
  selectedCluster: ControlState['selectedCluster'];
}

const SummaryWrapper = styled.div`
  color: white;
  position: absolute;
  z-index: 3;
  bottom: 1rem;
  left: 1rem;
  font-size: 0.8rem;
  max-width: 45vw;
  display: flex;
  flex-direction: column;
`;

const Summary: React.FC<SummaryProps> = ({ selectedCase, dateEndRange, clusterData, selectedCluster }) => {
  const [ cardType, setCardType ] = useState<Cluster | null>(null);
  const displayTransmissionCard = (type: Cluster | null) => {
    switch (type) {
      default:
        return null;
      case 'case':
        if (!selectedCase) {
          return;
        }
        return <CaseCard type='case' selectedCase={selectedCase} />;
      case 'transmission':
        if (!selectedCluster) {
          return;
        }
        return <CaseCard type='transmission' selectedCluster={selectedCluster} />;
    }
  };

  useEffect(() => {
    if (!selectedCluster) {
      return;
    }
    setCardType('transmission');
  }, [selectedCluster]);

  useEffect(() => {
    if (!selectedCase) {
      return;
    }
    setCardType('case');
  }, [selectedCase]);

  return (
    <SummaryWrapper>
      {cardType ? displayTransmissionCard(cardType) : null}
      <Legend dateEndRange={dateEndRange} clusterData={clusterData}/>
    </SummaryWrapper>
  );
};

export default Summary;
