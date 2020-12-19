import React, { useEffect } from "react";
import "./collection.style.scss";
import { connect } from "react-redux";
import { selectCollection } from "../../redux/shop/shop.selectors";
import { setCurrentNav } from "../../redux/nav/nav.actions";
import CollectionItem from "../../components/collection-item/collection-item.component";

const CollectionPage = ({ setCurrentNav, collection: { title, items } }) => {
  useEffect(() => {
    setCurrentNav("shop");
  }, [setCurrentNav]);

  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map((item) => {
          return <CollectionItem key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentNav: (location) => dispatch(setCurrentNav(location)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage);
