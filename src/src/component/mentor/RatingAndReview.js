import {
  colorBlueGray,
  colorTextBody,
  Flex,
  RowAlignCenterFlex,
  VerticalFlex,
} from "util/styledComponent";
import { Card } from "util/Card";
import { styled } from "@mui/material";
import CustomRating from "util/Rating";

const RatingAndReviewWrapper = styled(Flex)`
  width: 100%;
  margin-top: 30px;
`;

const AverageRatingWrapper = styled(RowAlignCenterFlex)`
  margin-left: 16px;
`;

const ReviewWrapper = styled(VerticalFlex)`
  height: 80px;
  padding:20px 0;
  border-bottom: 1px solid ${colorBlueGray};
`;

const NameWrapper = styled('span')`
  font-size: 14px;
  font-height: 20px;
  font-weight: 700;
  margin-right: 14px;
`;

const TextWrapper = styled(RowAlignCenterFlex)`
  line-height: 24px;
  color: ${colorTextBody};
  margin-top:12px;
`;

const reviews = [{ author: '장***', rating: 4.5, text: '안녕하세요, 현재 (주)다파다의 디자이너로 재직 중인 다슬기입니다. Dapada Edu와 Stock 등의 서비스의 디자인 총괄을 맡고있습니다.' },
{ author: '무***', rating: 3, text: '안녕하세요, 현재 (주)다파다의 디자이너로 재직 중인 다다다입니다. Dapada Edu와 Stock 등의 서비스의 디자인 총괄을 맡고있습니다.' },
{ author: '김***', rating: 2.5, text: '안녕하세요, 현재 (주)다파다의 디자이너로 재직 중인 고디입니다. Dapada Edu와 Stock 등의 서비스의 디자인 총괄을 맡고있습니다.' }]

function RatingAndReview() {
  return (
    <RatingAndReviewWrapper>
      <Card title={'만족도 및 리뷰'}
        titleHead={
          <AverageRatingWrapper>
            <CustomRating value={3.5} ></CustomRating>
          </AverageRatingWrapper>
        }
      >
        {reviews.map((review, index) => {
          return (
            <ReviewWrapper key={index}>
              <RowAlignCenterFlex>
                <NameWrapper>
                  {review.author}
                </NameWrapper>
                <CustomRating value={review.rating} ></CustomRating>
              </RowAlignCenterFlex>
              <TextWrapper>
                {review.text}
              </TextWrapper>
            </ReviewWrapper>

          );
        })}


      </Card>
    </RatingAndReviewWrapper>

  );
}

export default RatingAndReview;
