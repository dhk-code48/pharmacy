import { FeedBack, User } from "@prisma/client";
import React from "react";
import { Icons } from "../shared/Icons";
import { Badge } from "../ui/badge";
import { UserAvatar } from "../shared/UserAvatar";

const FeedBackInfo = ({ feedback }: { feedback: FeedBack & { user: User } }) => {
  return (
    <div className="text-center">
      <Icons.message className="text-muted-foreground size-10 mx-auto" />
      <h5 className="text-lg font-semibold">{feedback.title}</h5>
      <p>{feedback.message}</p>
      <div className="flex gap-2 m-3 justify-center">
        <Badge variant="outline" className="select-none">
          {feedback.topic}
        </Badge>
        <Badge variant="outline" className="select-none">
          {feedback.from}
        </Badge>
      </div>
      <p className="text-left font-semibold">FeedBack By:</p>
      <div className="flex group hover:bg-muted transition-all items-center my-3 gap-3 px-3 py-2 rounded-xl">
        <UserAvatar image={feedback.user.image} name={feedback.user.name} />
        <div className="text-left">
          <p className="font-semibold">{feedback.user.name}</p>
          <p className="text-sm font-medium text-muted-foreground">{feedback.user.email}</p>
          <p className="text-sm font-medium text-muted-foreground">{feedback.user.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default FeedBackInfo;
