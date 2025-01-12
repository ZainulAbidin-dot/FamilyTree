import React, { useState, useEffect, useRef } from 'react';
import { useFamilyTree } from './context/FamilyTreeContext';
import { useNavigate } from 'react-router-dom';
import { usePreviousState } from './hooks/use-previous-state';

const Orchard = () => {
  const { families, familyIds, loading } = useOrchard();
  const [activeFamilyIndex, setActiveFamilyIndex, previousActiveFamilyIndex] = usePreviousState(0);
  const [windowFocused, setWindowFocused] = useState(true);
  const intervalRef = useRef();
  const timeoutRef = useRef();
  const loopCompleteRef = useRef(false);
  const userInterruptRef = useRef(false);
  const navigate = useNavigate();

  const INTERVAL_DURATION = 10 * 1000; // 10 seconds
  const PAUSE_DURATION = 3 * 1000; // 3 seconds
  const ANIMATION_DURATION = 700; // 700 milliseconds

  const familyIdsLength = familyIds.length;

  useEffect(() => {
    if (!familyIdsLength) return;

    if (loopCompleteRef.current) return;

    // If the user has interrupted the interval, clear it.
    if(userInterruptRef.current && intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // If the window is not focused, clear the interval.
    if(!windowFocused) {
      if(intervalRef.current) clearInterval(intervalRef.current);
    }

    // If the user has interrupted the interval, or the window is not focused, do nothing.
    if(!windowFocused || userInterruptRef.current) {
      return;
    }

    intervalRef.current = setInterval(() => {
      const currentIndex = activeFamilyIndex ?? 0;
      const nextIndex = (currentIndex + 1) % familyIdsLength;

      console.log({ currentIndex, nextIndex });    

      if (nextIndex === 0) {
        loopCompleteRef.current = true;
        setActiveFamilyIndex(-1);
      } else {
       setActiveFamilyIndex(nextIndex);
      }
    }, INTERVAL_DURATION + PAUSE_DURATION); // pause is handled in css animation.

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [familyIdsLength, intervalRef.current, userInterruptRef.current, loopCompleteRef.current, windowFocused]);

  useEffect(() => {
    function handleVisibilityChange() {
      if (document.visibilityState === 'visible') {
        setWindowFocused(true);
      } else {
        setWindowFocused(false);
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if(!loopCompleteRef.current) return;

    timeoutRef.current = setTimeout(() => {
      navigate('/');
    }, PAUSE_DURATION);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [loopCompleteRef.current]);

  
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
              className='grid-item'
              key={family.family_id}
              style={
                activeFamilyIndex === index
                  ? {animation: `zoomIn ${ANIMATION_DURATION}ms ease-in forwards`, animationDelay: userInterruptRef.current ? '0ms' : `${PAUSE_DURATION}ms`}
                  : previousActiveFamilyIndex === index
                    ? {animation: `zoomOut ${ANIMATION_DURATION}ms ease-in forwards`}
                    : null
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
