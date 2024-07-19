// GridPerawi.js
import React from 'react';
import PropTypes from 'prop-types';
import ListPerawi from '../ListPerawi';
import Empty from '../../../components/Error';

const GridPerawi = ({ dataHadis }) => {
    return (
        <section className="grid-perawi-list max-w-6xl mx-auto mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-x-4 gap-y-4 overflow-hidden">
                {dataHadis.length > 0 ? (
                    dataHadis.map((data, index) => (
                        <ListPerawi
                            key={index}
                            namePerawi={data.name_hadith} // Change to data.name_hadith
                            totalHadis={data.total_hadith} // Ensure this is a string or update ListPerawi to handle numbers
                            slug={data.slug}
                        />
                    ))
                ) : (
                    <Empty />
                )}
            </div>
        </section>
    );
};

GridPerawi.propTypes = {
    dataHadis: PropTypes.array.isRequired
};

export default GridPerawi;
