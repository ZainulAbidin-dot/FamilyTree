import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { axiosClient, BACKEND_URL } from '../axios-client';

const FamilyTreeContext = createContext(null);

export function FamilyTreeProvider({ children }) {
  const [familyTreeData, setFamilyTreeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const abortController = useRef();

  useEffect(() => {
    abortController.current = new AbortController();

    axiosClient
      .get('/family-tree', { signal: abortController.current.signal })
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data) === false) {
          alert('Invalid data format');
          setFamilyTreeData([]);
        } else {
          const formattedFamilyTreeData = data.map((family) => {
            return {
              ...family,
              members: family.members.map((member) => {
                return {
                  ...member,
                  member_image: `${BACKEND_URL}/${member.member_image}`,
                };
              }),
            };
          });
          setFamilyTreeData(formattedFamilyTreeData);
        }
      })
      .catch((error) => {
        if (error.name !== 'CanceledError') {
          console.error('Error fetching family tree data:', error);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      abortController.current?.abort();
    };
  }, []);

  return (
    <FamilyTreeContext.Provider value={{ familyTreeData, loading }}>
      {children}
    </FamilyTreeContext.Provider>
  );
}

export function useFamilyTree() {
  const context = useContext(FamilyTreeContext);
  if (context === undefined) {
    throw new Error('useFamilyTree must be used within a FamilyTreeProvider');
  }
  return context;
}
