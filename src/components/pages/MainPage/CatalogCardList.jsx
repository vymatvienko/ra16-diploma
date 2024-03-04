import TopSalesCard from "./TopSalesCard";

const CatalogCardList = ({ data, items }) => {
    // console.log({ data });
    
    if (items == undefined) {
      return (
        <div className="row">
                {data.map(card => <TopSalesCard key={card.id} props={card} />)}
            </div>
      )
    } else {
      return (
        <>
            <div className="row">
                {data.map(card => <TopSalesCard key={card.id} props={card} />)}
                {items.map(card => <TopSalesCard key={card.id} props={card} />)}
            </div>
        </>
      )
    }
}

export default CatalogCardList