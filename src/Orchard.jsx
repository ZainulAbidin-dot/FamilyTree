import React, { useState, useEffect, useRef, act } from 'react';
import { useFamilyTree } from './context/FamilyTreeContext';
import { useNavigate } from 'react-router-dom';

const Orchard = () => {
  const { families, familyIds, loading } = useOrchard();
  const [activeFamilyIndex, setActiveFamilyIndex] = useState(0);
  const intervalRef = useRef();
  const userInterruptRef = useRef(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const INTERVAL_DURATION = 10 * 1000; // 10 seconds

  //   if (!familyIds.length) return;

  //   // If the user has interrupted the interval, clear it.
  //   // Otherwise, set a new interval.
  //   if (userInterruptRef.current) {
  //     if (intervalRef.current) clearInterval(intervalRef.current);
  //     return;
  //   }

  //   intervalRef.current = setInterval(() => {
  //     const currentIndex = activeFamilyIndex ?? 0;
  //     const nextIndex = (currentIndex + 1) % familyIds.length;

  //     console.log({ currentIndex, nextIndex });

  //     if (nextIndex === 0) {
  //       navigate('/');
  //     } else {
  //       setActiveFamilyIndex(nextIndex);
  //     }
  //   }, INTERVAL_DURATION);

  //   return () => {
  //     clearInterval(intervalRef.current);
  //   };
  // }, [userInterruptRef.current, familyIds]);

  useEffect(() => {
    const INTERVAL_DURATION = 3 * 1000; // 3 seconds

    if (!familyIds.length) return;
  
    // If the user has interrupted the interval, clear it.
    // Otherwise, set a new interval.
    if (userInterruptRef.current) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
  
    const timeoutRef = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        const currentIndex = activeFamilyIndex ?? 0;
        const nextIndex = (currentIndex + 1) % familyIds.length;
  
        console.log({ currentIndex, nextIndex });
  
        if (nextIndex === 0) {
          navigate('/');
        } else {
          setActiveFamilyIndex(nextIndex);
        }
      }, INTERVAL_DURATION);
    }, PAUSE_DURATION);
  
    // Cleanup function
    return () => {
      clearTimeout(timeoutRef);
      clearInterval(intervalRef.current);
    };
  }, [userInterruptRef.current, familyIds]);
  
  useEffect(() => {
    function handleKeyDown(event) {
      if (activeFamilyIndex === null) return;

      if (event.key === 'Escape') {
        setActiveFamilyIndex(null);

        userInterruptRef.current = true;
      } else if (event.key === 'ArrowRight') {
        setActiveFamilyIndex((prev) => {
          return prev + 1 >= familyIds.length ? 0 : prev + 1;
        });

        userInterruptRef.current = true;
      } else if (event.key === 'ArrowLeft') {
        setActiveFamilyIndex((prev) => {
          return prev - 1 < 0 ? familyIds.length - 1 : prev - 1;
        });

        userInterruptRef.current = true;
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeFamilyIndex]);

  function handleFamilyTreeClick(event, familyIndex) {
    console.log('handleFamilyTreeClick', familyIndex);
    if (activeFamilyIndex === familyIndex) setActiveFamilyIndex(null);
    else setActiveFamilyIndex(familyIndex);

    // Set a flag to interrupt the interval
    userInterruptRef.current = true;

    event.stopPropagation();
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className='text-dark'>THE ORCHARD</h1>
      <div className='grid-layout'>
        {families.map((family, index) => {
          return (
            <div
              onClick={(e) => handleFamilyTreeClick(e, index)}
              className='grid-item d-flex flex-column align-items-center'
              key={family.family_id}
              style={
                activeFamilyIndex === index
                  ? activeFamilyTreeStyles
                  : defaultFamilyTreeStyles
              }
            >
              <p style={{ fontSize: '9px' }} className='h6 lead text-center m-0'>
                {family.family_name.toUpperCase()}
              </p>
              <div className='rootTree m-0'>
                {family.members.map((member) => (
                  <div key={member.member_id} className='mb-2 text-center'>
                    {member.member_as === 'Patriarch_Father' &&
                      member.sub_family_of === null && (
                        <OrchardImage
                          className='parent3'
                          member_image={member.member_image}
                          name={member.name.toUpperCase()}
                        />
                      )}
                    {member.member_as === 'Patriarch_Mother' &&
                      member.sub_family_of === null && (
                        <OrchardImage
                          className='parent4'
                          member_image={member.member_image}
                          name={member.name.toUpperCase()}
                        />
                      )}
                    {member.member_as === 'Matriarch_Father' &&
                      member.sub_family_of === null && (
                        <OrchardImage
                          className='parent23'
                          member_image={member.member_image}
                          name={member.name.toUpperCase()}
                        />
                      )}
                    {member.member_as === 'Matriarch_Mother' &&
                      member.sub_family_of === null && (
                        <OrchardImage
                          className='parent24'
                          member_image={member.member_image}
                          name={member.name.toUpperCase()}
                        />
                      )}
                    {member.member_as === 'Patriarch' && (
                      <OrchardImage
                        className='rootpersonpatriarch'
                        member_image={member.member_image}
                        name={member.name.toUpperCase()}
                      />
                    )}
                    {member.member_as === 'Matriarch' && (
                      <OrchardImage
                        className='rootpersonmatriarch'
                        member_image={member.member_image}
                        name={member.name.toUpperCase()}
                      />
                    )}
                    {(member.member_as === 'Son' || member.member_as === 'Daughter') && (
                      <OrchardImage
                        className={`rootperson1${member.order}`}
                        member_image={member.member_image}
                        name={member.name.toUpperCase()}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function OrchardImage(props) {
  const { className, member_image, name } = props;

  return (
    <img
      className={className}
      src={member_image}
      alt={name}
      data-bs-toggle='tooltip'
      data-bs-placement='top'
      title={name}
      loading='lazy'
      style={{
        position: 'absolute',
        borderRadius: '50%',
        transition: 'transform 0.3s ease-in-out, z-index 0s',
      }}
      onMouseEnter={(e) => {
        e.target.style.borderRadius = '5%';
        e.target.style.transform = 'scale(6)';
        e.target.style.zIndex = '9999';
      }}
      onMouseLeave={(e) => {
        e.target.style.borderRadius = '50%';
        e.target.style.transform = 'scale(1)';
        e.target.style.zIndex = '1';
      }}
    />
  );
}

const activeFamilyTreeStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) scale(4)',
  zIndex: '10',
  cursor: 'pointer',
  backgroundColor: 'white',
  margin: 'auto',
  transition: 'transform 0.7s ease-in-out, top 0.7s ease-in-out, left 0.7s ease-in-out',
};

const defaultFamilyTreeStyles = {
  position: '',
  top: '',
  left: '',
  transform: 'scale(1)',
  zIndex: '',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  transition: 'transform 0.7s ease-in-out, top 0.7s ease-in-out, left 0.7s ease-in-out',
};

function useOrchard() {
  const { familyTreeData, loading } = useFamilyTree();
  const familyOrderArr = [
    'Rephael & Henny',
    'Dovi & Chava',
    'Moshe & Sarala',
    'Yaakov Ben-Tzion & Rivky',
    'Yitzy & Perel Bracha',
    'Moshe Eliyahu & Ahuva',
    'Sholom & Rochel',
    'Mayer Moshe & Esther Toby',
    'Aba & Ema',
    'M.M. & Sara',
    'Avrohom Shimon & Shani',
    'Chaim Tzvi & Yehudis',
    'Tzvi & Rivky',
    'Eli & Tzivi',
    'Chaim & Chaya Deena',
    'Avrohom Tzvi & Leah',
    'Chaim & Rochela',
  ];

  const reorderedFamily = [];

  familyOrderArr.forEach((orderedFamilyName) =>
    familyTreeData.map((family) => {
      if (orderedFamilyName == family.family_name) {
        reorderedFamily.push(family);
      }
    })
  );

  const familyIds = reorderedFamily.map((family) => family.family_id);

  return { families: reorderedFamily, familyIds, loading };
}

export default Orchard;
