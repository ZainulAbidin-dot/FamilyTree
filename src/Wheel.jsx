import React, { useEffect, useState } from 'react';

// Import the required stylesheets
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import GridLayout from 'react-grid-layout';
import { axiosClient, BACKEND_URL } from './axios-client';

const Wheel = () => {
  const [rootFamily, setRootFamily] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axiosClient.get('/family-tree', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(data);
      setRootFamily(data);
    }
    fetchData();
  }, []);

  const layout = rootFamily.map((family, index) => {
    return {
      i: family.family_id.toString(),
      x: index,
      y: 0,
      w: 1,
      h: 1,
    };
  });
  return (
    <div>
      <h1 className='text-dark'>Family Group</h1>
      <div>
        <GridLayout
          layout={layout}
          cols={12}
          rowHeight={30}
          width={1200}
          autoSize
          useCSSTransforms={true}
          allowOverlap={true}
          isResizable={false}
        >
          {rootFamily.map((family) => (
            <div className='d-flex flex-column align-items-center' key={family.family_id}>
              <p style={{ fontSize: '9px' }} className='h6 lead text-center m-0'>
                {family.family_name}
              </p>
              <div className='rootTree m-0'>
                {family.members.map((member, index2) => (
                  <div key={member.member_id} className='mb-2 text-center'>
                    {member.member_as === 'Patriarch_Father' &&
                      member.sub_family_of === null && (
                        <img
                          className='parent3'
                          src={
                            `${BACKEND_URL}/${member.member_image}` ||
                            'https://randomuser.me/api/portraits/women/64.jpg'
                          }
                          alt=''
                          data-bs-toggle='tooltip'
                          data-bs-placement='top'
                          title={member.name}
                        />
                      )}
                    {member.member_as === 'Patriarch_Mother' &&
                      member.sub_family_of === null && (
                        <img
                          className='parent4'
                          src={
                            `${BACKEND_URL}/${member.member_image}` ||
                            'https://randomuser.me/api/portraits/women/64.jpg'
                          }
                          alt=''
                          data-bs-toggle='tooltip'
                          data-bs-placement='top'
                          title={member.name}
                        />
                      )}
                    {member.member_as === 'Matriarch_Father' &&
                      member.sub_family_of === null && (
                        <img
                          className='parent23'
                          src={
                            `${BACKEND_URL}/${member.member_image}` ||
                            'https://randomuser.me/api/portraits/women/64.jpg'
                          }
                          alt=''
                          data-bs-toggle='tooltip'
                          data-bs-placement='top'
                          title={member.name}
                        />
                      )}
                    {member.member_as === 'Matriarch_Mother' &&
                      member.sub_family_of === null && (
                        <img
                          className='parent24'
                          src={
                            `${BACKEND_URL}/${member.member_image}` ||
                            'https://randomuser.me/api/portraits/women/64.jpg'
                          }
                          alt=''
                          data-bs-toggle='tooltip'
                          data-bs-placement='top'
                          title={member.name}
                        />
                      )}
                    {member.member_as === 'Patriarch' && (
                      <img
                        className='rootpersonpatriarch'
                        src={
                          `${BACKEND_URL}/${member.member_image}` ||
                          'https://randomuser.me/api/portraits/women/64.jpg'
                        }
                        alt=''
                        data-bs-toggle='tooltip'
                        data-bs-placement='top'
                        title={member.name}
                      />
                    )}
                    {member.member_as === 'Matriarch' && (
                      <img
                        className='rootpersonmatriarch'
                        src={
                          `${BACKEND_URL}/${member.member_image}` ||
                          'https://randomuser.me/api/portraits/women/64.jpg'
                        }
                        alt=''
                        data-bs-toggle='tooltip'
                        data-bs-placement='top'
                        title={member.name}
                      />
                    )}
                    {(member.member_as === 'Son' || member.member_as === 'Daughter') && (
                      <img
                        className={`rootperson1${1 + index2}`}
                        src={
                          `${BACKEND_URL}/${member.member_image}` ||
                          'https://randomuser.me/api/portraits/women/64.jpg'
                        }
                        alt=''
                        data-bs-toggle='tooltip'
                        data-bs-placement='top'
                        title={member.name}
                        style={{
                          position: 'absolute',
                          borderRadius: '50%',
                          transition: 'transform 0.3s ease-in-out, z-index 0s',
                          // top: `${40 + (index2 )}%`,  // Dynamically adjust top position based on the index
                          // left: `${40 + (index2 )}%`  // Dynamically adjust left position based on the index
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
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </GridLayout>
      </div>
    </div>
  );
};

export default Wheel;
