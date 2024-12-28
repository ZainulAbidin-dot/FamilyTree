import { useState, useEffect } from 'react';
import { useFamilyTree } from './context/FamilyTreeContext';

const Orchard = () => {
  const { familyTreeData, loading } = useFamilyTree();
  const [activeFamilyId, setActiveFamilyId] = useState();

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setActiveFamilyId(null);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
    'M.M & Sara',
    'Avrohom Shimon & Shani',
    'Chaim Tzvi & Yehudis',
    'Tzvi & Rivky',
    'Eli & Tzivi',
    'Chaim & Chaya Deena',
    'Avrohom Tzvi & Leah',
    'Chaim & Rochela',
  ];

  // console.log(rootFamily)
  const reorderedFamily = [];

  familyOrderArr.forEach((orderedFamilyName) =>
    familyTreeData.map((family) => {
      if (orderedFamilyName == family.family_name) reorderedFamily.push(family);
    })
  );

  function handleFamilyTreeClick(event, familyId) {
    if (activeFamilyId === familyId) setActiveFamilyId(null);
    else setActiveFamilyId(familyId);

    event.stopPropagation();
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className='text-dark'>The Orchard</h1>
      <div>
        <div className='grid-layout'>
          {reorderedFamily.map((family) => {
            let counter = 1;
            return (
              <div
                onClick={(e) => handleFamilyTreeClick(e, family.family_id)}
                className='grid-item d-flex flex-column align-items-center'
                style={
                  activeFamilyId === family.family_id
                    ? activeFamilyTreeStyles
                    : defaultFamilyTreeStyles
                }
                key={family.family_id}
              >
                <p style={{ fontSize: '9px' }} className='h6 lead text-center m-0'>
                  {family.family_name}
                </p>
                <div className='rootTree m-0'>
                  {family.members.map((member, index2) => (
                    <div key={member.member_id} className='mb-2 text-center'>
                      {member.member_as === 'Patriarch_Father' &&
                        member.sub_family_of === null && (
                          <WheelImage
                            className='parent3'
                            member_image={member.member_image}
                            name={member.name}
                          />
                        )}
                      {member.member_as === 'Patriarch_Mother' &&
                        member.sub_family_of === null && (
                          <WheelImage
                            className='parent4'
                            member_image={member.member_image}
                            name={member.name}
                          />
                        )}
                      {member.member_as === 'Matriarch_Father' &&
                        member.sub_family_of === null && (
                          <WheelImage
                            className='parent23'
                            member_image={member.member_image}
                            name={member.name}
                          />
                        )}
                      {member.member_as === 'Matriarch_Mother' &&
                        member.sub_family_of === null && (
                          <WheelImage
                            className='parent24'
                            member_image={member.member_image}
                            name={member.name}
                          />
                        )}
                      {member.member_as === 'Patriarch' && (
                        <WheelImage
                          className='rootpersonpatriarch'
                          member_image={member.member_image}
                          name={member.name}
                        />
                      )}
                      {member.member_as === 'Matriarch' && (
                        <WheelImage
                          className='rootpersonmatriarch'
                          member_image={member.member_image}
                          name={member.name}
                        />
                      )}
                      {(member.member_as === 'Son' ||
                        member.member_as === 'Daughter') && (
                        <WheelImage
                          className={`rootperson1${counter++}`}
                          member_image={member.member_image}
                          name={member.name}
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
    </div>
  );
};

function WheelImage(props) {
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
        e.target.style.zIndex = '9999'; // Ensure the image is on top when hovered
      }}
      onMouseLeave={(e) => {
        e.target.style.borderRadius = '50%';
        e.target.style.transform = 'scale(1)';
        e.target.style.zIndex = '1'; // Reset z-index to normal when hover ends
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
  backgroundColor: 'white',
  transition: 'transform 0.7s ease-in-out, top 0.7s ease-in-out, left 0.7s ease-in-out',
};

const defaultFamilyTreeStyles = {
  position: '',
  top: '',
  left: '',
  transform: 'scale(1)',
  zIndex: '',
  backgroundColor: 'transparent',
  transition: 'transform 0.7s ease-in-out, top 0.7s ease-in-out, left 0.7s ease-in-out',
};

export default Orchard;
