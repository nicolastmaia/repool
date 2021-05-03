import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect, useState } from 'react';
import propriedadeApi from 'src/api/propriedades';
import { extractComodidades } from 'src/utils/anuncioUtils';
import { separateActiveAndInactive, substituteInterest } from 'src/utils/propriedadeUtils';
import AuthContext from './AuthContext';

const PropriedadeContext = createContext({
  activePropriedade: null,
  activePropInterests: null,
  activePropRents: null,
  propriedadesProprias: null,
  activeRentAsInquilino: null,
  inactiveRentsAsInquilino: null,
  allRents: null,
  fetchPropriedadesProprias: null,
  fetchRentsAsInquilino: null,
  fetchRentsAsOwner: null,
  fetchInterestedUsers: null,
  ownerToggleConfirm: null,
  subscriberConfirmRent: null,
  subscriberRemoveRent: null,
  ownerRemoveRent: null,
  fetchAllRents: null,
  fetchActivePropriedade: null,
  savePropriedade: null,
});

export const PropriedadeProvider = ({ children }) => {
  const [propriedadesProprias, setPropriedadesProprias] = useState([]);
  const [activeRentAsInquilino, setActiveRentAsInquilino] = useState(null);
  const [inactiveRentsAsInquilino, setInactiveRentsAsInquilino] = useState([]);
  const [activePropriedade, setActivePropriedade] = useState({});
  const [activePropInterests, setActivePropInterests] = useState([]);
  const [activePropRents, setActivePropRents] = useState([]);
  const [allRents, setAllRents] = useState([]);

  const { user, userToken, reloadUser, changeUserToken } = useContext(AuthContext);

  const fetchPropriedadesProprias = async () => {
    try {
      if (user.role !== 'USER') {
        const response = await propriedadeApi.getPropertiesAsOwner(userToken);
        setPropriedadesProprias(response);
        return 'success';
      }
      setPropriedadesProprias([]);
      return '';
    } catch (error) {
      return 'error';
    }
  };

  const fetchInterestedUsers = async (propertyId) => {
    try {
      const { interests } = await propriedadeApi.getInterests(propertyId, userToken);
      setActivePropInterests(interests);
      return 'success';
    } catch (error) {
      setActivePropInterests([]);
      return 'error';
    }
  };

  const ownerToggleConfirm = async (interestId) => {
    const activeInterest = activePropInterests.find((interest) => interest.id === interestId);
    try {
      const interest = await propriedadeApi.ownerToggleConfirm(
        !activeInterest.pConfirmation,
        interestId,
        userToken
      );
      const editedActivePropInterests = substituteInterest(interest, activePropInterests);
      setActivePropInterests(editedActivePropInterests);
      return 'success';
    } catch (error) {
      return 'error';
    }
  };

  const subscriberConfirmRent = async (interestId) => {
    try {
      await propriedadeApi.subscriberConfirmRent(interestId, userToken);
      await reloadUser();
      return 'confirm';
    } catch (error) {
      return 'error';
    }
  };

  const subscriberRemoveRent = async (rentId) => {
    try {
      await propriedadeApi.subscriberRemoveRent(rentId, userToken);
      await reloadUser();
      return 'success';
    } catch (error) {
      return 'error';
    }
  };

  const ownerRemoveRent = async (rentId) => {
    try {
      const inactiveRent = await propriedadeApi.ownerRemoveRent(rentId, userToken);
      setActivePropRents((prevState) => {
        return prevState.filter((rent) => rent.id === inactiveRent.id);
      });
      return 'success';
    } catch (error) {
      return 'error';
    }
  };

  const fetchAllRents = async () => {
    try {
      const rents = await propriedadeApi.getAllRents(userToken);
      setAllRents(rents);
      return 'success';
    } catch (error) {
      return 'error';
    }
  };

  const fetchActivePropriedade = async (id) => {
    try {
      const tmpPropriedade = await propriedadeApi.getOne(id, userToken);
      const editedPropriedade = extractComodidades(tmpPropriedade);
      setActivePropriedade(editedPropriedade);
      return 'success';
    } catch (error) {
      return 'error';
    }
  };

  const fetchRentsAsInquilino = async () => {
    try {
      const rents = await propriedadeApi.getRentsAsInquilino(userToken);
      const [activeRent, inactiveRent] = separateActiveAndInactive(rents);
      setActiveRentAsInquilino(activeRent);
      setInactiveRentsAsInquilino(inactiveRent);
      return 'success';
    } catch (error) {
      return 'error';
    }
  };

  const fetchRentsAsOwner = async (propertyId) => {
    try {
      const rents = await propriedadeApi.getRentsAsOwner(propertyId, userToken);
      setActivePropRents(rents);
      return 'success';
    } catch (error) {
      return 'message';
    }
  };

  const savePropriedade = async (propriedade, photo) => {
    try {
      if (user.role === 'USER') {
        const [newPropriedade, newOwnerToken] = await propriedadeApi.postAsSubscriber(
          propriedade,
          photo,
          userToken
        );
        changeUserToken(newOwnerToken);
      } else {
        await propriedadeApi.postAsOwner(propriedade, photo, userToken);
      }
      reloadUser();
      return 'success';
    } catch (error) {
      return 'error';
    }
  };

  const clearAll = () => {
    setActivePropriedade({});
    setActivePropInterests([]);
    setActiveRentAsInquilino(null);
    setInactiveRentsAsInquilino([]);
    setPropriedadesProprias([]);
  };

  useEffect(() => {
    const fetchMoreData = async () => {
      await fetchInterestedUsers(activePropriedade.id);
      await fetchRentsAsOwner(activePropriedade.id);
    };
    fetchMoreData();
  }, [activePropriedade]);

  useEffect(() => {
    clearAll();
  }, [userToken]);

  return (
    <PropriedadeContext.Provider
      value={{
        activePropriedade,
        activePropInterests,
        activePropRents,
        propriedadesProprias,
        activeRentAsInquilino,
        inactiveRentsAsInquilino,
        allRents,
        fetchPropriedadesProprias,
        fetchRentsAsInquilino,
        fetchRentsAsOwner,
        fetchInterestedUsers,
        ownerToggleConfirm,
        subscriberConfirmRent,
        subscriberRemoveRent,
        ownerRemoveRent,
        fetchAllRents,
        fetchActivePropriedade,
        savePropriedade,
      }}
    >
      {children}
    </PropriedadeContext.Provider>
  );
};

PropriedadeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PropriedadeContext;
