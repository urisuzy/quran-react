// GridResultListHadis.js
import React from "react";
import PropTypes from 'prop-types';
import ListResultHadis from '../ListResultHadis';
import Empty from '../../../Error';

const GridResultListHadis = ({ hadisData }) => {
    return (
        <div className="detail-kitab justify-center px-2">
            <div className="detail-card max-w-6xl mx-auto flex flex-row mt-8">
                <div className="grid grid-cols-1 gap-y-4 w-full">
                    {hadisData && hadisData.length > 0 ? (
                        hadisData.map((hadis) => (
                            <ListResultHadis
                                key={hadis.id}
                                hadis={hadis}
                            />
                        ))
                    ) : (
                        <Empty key="empty-hadis" />
                    )}
                </div>
            </div>
        </div>
    );
};

GridResultListHadis.propTypes = {
    hadisData: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            ayat_hadith: PropTypes.shape({
                id: PropTypes.number.isRequired,
                number: PropTypes.string.isRequired,
                arab: PropTypes.string.isRequired,
                indonesia: PropTypes.string.isRequired
            }).isRequired
        }).isRequired
    ).isRequired
};

export default GridResultListHadis;
