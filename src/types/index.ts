import { Content } from "@theme/BlogPostPage";

export interface BlogProps {
    readonly recentPosts: readonly {
        readonly content: Content
    }[];
}