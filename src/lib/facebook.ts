// Facebook Graph API client for auto-posting to Facebook Page

const FB_GRAPH_API = "https://graph.facebook.com/v26.0";

export type FacebookPostResult = {
  id: string;
  post_id?: string;
  error?: string;
};

export type ScheduledPost = {
  id: string;
  message: string;
  link?: string;
  scheduledTime: string;
  status: "scheduled" | "posted" | "failed";
  postId?: string;
  createdAt: string;
};

export type PostHistory = {
  id: string;
  message: string;
  link?: string;
  postedAt: string;
  postId?: string;
  status: "posted" | "failed";
  error?: string;
};

// Get Facebook Page info
export async function getPageInfo(pageAccessToken: string, pageId: string) {
  let res = await fetch(
    `${FB_GRAPH_API}/${pageId}?fields=name,picture&access_token=${pageAccessToken}`
  );
  let data = await res.json();
  if (data.error) {
    // Fallback to /me if direct pageId fails
    res = await fetch(
      `${FB_GRAPH_API}/me?fields=name,picture&access_token=${pageAccessToken}`
    );
    data = await res.json();
  }
  if (data.error) {
    throw new Error(data.error.message);
  }
  return data;
}

// Post to Facebook Page immediately
export async function postToPage(
  pageAccessToken: string,
  pageId: string,
  message: string,
  link?: string
): Promise<FacebookPostResult> {
  const body: Record<string, string> = {
    message,
    access_token: pageAccessToken,
  };

  if (link) {
    body.link = link;
  }

  let res = await fetch(`${FB_GRAPH_API}/${pageId}/feed`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  let data = await res.json();

  if (data.error) {
    // Fallback to /me/feed
    res = await fetch(`${FB_GRAPH_API}/me/feed`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    data = await res.json();
  }

  if (data.error) {
    return { id: "", error: data.error.message };
  }

  return { id: data.id, post_id: data.post_id };
}

// Post to Facebook Page with photo
export async function postWithPhoto(
  pageAccessToken: string,
  pageId: string,
  message: string,
  photoUrl: string,
  link?: string
): Promise<FacebookPostResult> {
  // Facebook Photos API doesn't support separate link parameter,
  // so append it to the message
  const fullMessage = link ? `${message}\n\n${link}` : message;

  const body: Record<string, string> = {
    message: fullMessage,
    url: photoUrl,
    access_token: pageAccessToken,
  };

  let res = await fetch(`${FB_GRAPH_API}/${pageId}/photos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  let data = await res.json();

  if (data.error) {
    // Fallback to /me/photos
    res = await fetch(`${FB_GRAPH_API}/me/photos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    data = await res.json();
  }

  if (data.error) {
    return { id: "", error: data.error.message };
  }

  // Photos API returns {id: "photo_id", post_id: "pageId_postId"}
  return { id: data.id, post_id: data.post_id };
}

// Schedule a post to Facebook Page (requires published_posts permission)
export async function schedulePost(
  pageAccessToken: string,
  pageId: string,
  message: string,
  scheduledTime: string,
  link?: string
): Promise<FacebookPostResult> {
  const body: Record<string, string> = {
    message,
    access_token: pageAccessToken,
    published: "false",
    scheduled_publish_time: Math.floor(new Date(scheduledTime).getTime() / 1000).toString(),
  };

  if (link) {
    body.link = link;
  }

  const res = await fetch(`${FB_GRAPH_API}/${pageId}/feed`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (data.error) {
    return { id: "", error: data.error.message };
  }

  return { id: data.id, post_id: data.post_id };
}

// Get scheduled (unpublished) posts from Facebook Page
export async function getScheduledPosts(
  pageAccessToken: string,
  pageId: string
) {
  const res = await fetch(
    `${FB_GRAPH_API}/${pageId}/scheduled_posts?fields=message,created_time,scheduled_publish_time,permalink_url&limit=50&access_token=${pageAccessToken}`
  );
  const data = await res.json();
  if (data.error) {
    // Fallback: try /me/scheduled_posts
    const fallbackRes = await fetch(
      `${FB_GRAPH_API}/me/scheduled_posts?fields=message,created_time,scheduled_publish_time,permalink_url&limit=50&access_token=${pageAccessToken}`
    );
    const fallbackData = await fallbackRes.json();
    if (fallbackData.error) {
      throw new Error(fallbackData.error.message);
    }
    return fallbackData.data || [];
  }
  return data.data || [];
}

// Get page posts history
export async function getPagePosts(
  pageAccessToken: string,
  pageId: string,
  limit: number = 10
) {
  let res = await fetch(
    `${FB_GRAPH_API}/${pageId}/posts?fields=message,created_time,permalink_url&limit=${limit}&access_token=${pageAccessToken}`
  );
  let data = await res.json();
  if (data.error) {
    // Fallback to /me/posts
    res = await fetch(
      `${FB_GRAPH_API}/me/posts?fields=message,created_time,permalink_url&limit=${limit}&access_token=${pageAccessToken}`
    );
    data = await res.json();
  }
  if (data.error) {
    throw new Error(data.error.message);
  }
  // Filter out posts without message (profile pic updates, cover changes, etc.)
  return (data.data || []).filter((post: Record<string, unknown>) => post.message);
}

// Generate post message from blog post
export function generatePostFromBlog(
  title: string,
  description: string,
  url: string,
  tags: string[] = []
): string {
  const tagStr = tags.length > 0 ? "\n\n" + tags.map((t) => `#${t.replace(/\s/g, "")}`).join(" ") : "";
  return `${title}\n\n${description}\n\nอ่านต่อได้ที่: ${url}${tagStr}`;
}

// Generate promotional post
export function generatePromoPost(
  serviceName: string,
  description: string,
  price?: string
): string {
  let post = `${serviceName}\n\n${description}`;
  if (price) {
    post += `\n\n💰 ราคาเริ่มต้น ${price}`;
  }
  post += "\n\nสนใจทัก LINE ได้เลย";
  post += "\nเว็บ: https://dgkingshop.com";
  return post;
}

// Delete a post from Facebook Page
export async function deletePost(
  pageAccessToken: string,
  postId: string
): Promise<{ success: boolean; error?: string }> {
  let res = await fetch(
    `${FB_GRAPH_API}/${postId}?access_token=${pageAccessToken}`,
    { method: "DELETE" }
  );
  let data = await res.json();
  if (data.error) {
    // Try with pageId_postId format (for photo posts)
    const pageId = process.env.FB_PAGE_ID;
    if (pageId && !postId.includes("_")) {
      res = await fetch(
        `${FB_GRAPH_API}/${pageId}_${postId}?access_token=${pageAccessToken}`,
        { method: "DELETE" }
      );
      data = await res.json();
    }
  }
  if (data.error) {
    return { success: false, error: data.error.message };
  }
  return { success: true };
}

// Get post insights (likes, comments, shares)
export async function getPostInsights(
  pageAccessToken: string,
  postId: string
) {
  const res = await fetch(
    `${FB_GRAPH_API}/${postId}/insights?metric=post_reactions_like_total,post_comments,post_shares&access_token=${pageAccessToken}`
  );
  const data = await res.json();
  if (data.error) {
    throw new Error(data.error.message);
  }
  return data.data || [];
}

// Get all posts with insights
export async function getPostsStats(
  pageAccessToken: string,
  pageId: string,
  limit: number = 10
) {
  let res = await fetch(
    `${FB_GRAPH_API}/${pageId}/posts?fields=message,created_time,permalink_url&limit=${limit}&access_token=${pageAccessToken}`
  );
  let data = await res.json();
  if (data.error) {
    // Fallback to /me/posts
    res = await fetch(
      `${FB_GRAPH_API}/me/posts?fields=message,created_time,permalink_url&limit=${limit}&access_token=${pageAccessToken}`
    );
    data = await res.json();
  }
  if (data.error) {
    throw new Error(data.error.message);
  }
  return (data.data || []).map((post: Record<string, unknown>) => ({
    id: post.id,
    message: post.message || "",
    created_time: post.created_time,
    permalink_url: post.permalink_url || "",
    link: (post.link as string) || "",
    likes: 0,
    comments: 0,
    shares: 0,
  }));
}

// Get comments on a specific post
export async function getComments(
  pageAccessToken: string,
  postId: string
) {
  const res = await fetch(
    `${FB_GRAPH_API}/${postId}/comments?fields=id,message,from,created_time,like_count,comment_count&access_token=${pageAccessToken}`
  );
  const data = await res.json();
  if (data.error) {
    throw new Error(data.error.message);
  }
  return data.data || [];
}

// Reply to a comment
export async function replyComment(
  pageAccessToken: string,
  commentId: string,
  message: string
): Promise<FacebookPostResult> {
  const res = await fetch(`${FB_GRAPH_API}/${commentId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      access_token: pageAccessToken,
    }),
  });
  const data = await res.json();
  if (data.error) {
    return { id: "", error: data.error.message };
  }
  return { id: data.id };
}

// Get comments for multiple posts (latest posts with their comments)
export async function getPostsWithComments(
  pageAccessToken: string,
  pageId: string,
  limit: number = 5
) {
  let res = await fetch(
    `${FB_GRAPH_API}/${pageId}/posts?fields=message,created_time,permalink_url&limit=${limit}&access_token=${pageAccessToken}`
  );
  let data = await res.json();
  if (data.error) {
    res = await fetch(
      `${FB_GRAPH_API}/me/posts?fields=message,created_time,permalink_url&limit=${limit}&access_token=${pageAccessToken}`
    );
    data = await res.json();
  }
  if (data.error) {
    throw new Error(data.error.message);
  }

  const posts = (data.data || []).filter((p: Record<string, unknown>) => p.message);

  // Fetch comments for each post
  const postsWithComments = await Promise.all(
    posts.map(async (post: Record<string, unknown>) => {
      try {
        const comments = await getComments(pageAccessToken, post.id as string);
        return { ...post, comments };
      } catch {
        return { ...post, comments: [] };
      }
    })
  );

  return postsWithComments;
}
