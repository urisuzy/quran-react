import React from "react";
import PropTypes from 'prop-types';
import ListHadis from '../ListHadis';
import Empty from '../../Error';

const GridListHadis = ({ hadisData }) => {
    return (
        <div className="detail-kitab justify-center px-2">
            <div className="detail-card max-w-6xl mx-auto flex flex-row mt-8">
                <div className="grid grid-cols-1 gap-y-4 w-full">
                    {hadisData && hadisData.length > 0 ? (
                        hadisData.map((hadis) => (
                            <ListHadis
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

GridListHadis.propTypes = {
    hadisData: PropTypes.array.isRequired
};

export default GridListHadis;
